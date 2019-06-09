/**
 * @file MQTT receiving and processing
 *
 * @author Jayden Chan
 * @author Brendon Earl
 * @author Chad McColm
 */

// Libraries
import * as mqtt from 'mqtt';
import { isEqual } from 'lodash';

// Modules
import { getLogger } from './logger';
import * as storage from '../modules/storage';
import * as socket from '../modules/net/socket';

const BROKER_ADDR = 'mqtt://localhost:1883';

const logger = getLogger('mqtt');
let client: mqtt.Client;

const state = {
  nextOutput: {},
  lastDbOutput: {},
  consoleLastSent: 0,
  socketLastSent: 0,
  dbLastSent: 0,
  mqttTimeout: undefined,
  isReceivingData: false,
};

export interface MQTTOptions {
  socketSendDelay?: number,
  consoleLogDelay?: number,
  dbWriteDelay?: number,
  mqttTimeout?: number,
  verboseLogging?: boolean,
  mongoEnabled: boolean,
}

/**
 * Initialize the MQTT client
 *
 * @return {boolean} Whether the initialization was successful
 */
export function init(): boolean {
  if (client !== undefined) throw 'MQTT client already initialized';

  logger.info('Initializing MQTT client');

  // Connect client to mqtt broker
  try {
    client = mqtt.connect(BROKER_ADDR);
  } catch (e) {
    logger.error(`MQTT client failed to initialize`);
    logger.error(e);

    return false;
  }

  logger.info('MQTT client initialized successfully');
  return true;
}

/**
 * Activates the MQTT event hooks
 *
 * @param {boolean} mongoEnabled Whether to write to Mongo
 * @param {MQTTOptions} options MQTT options
 */
export function activate(options: MQTTOptions) {
  logger.info('Activating MQTT module');

  const opts = {
    socketSendDelay: options.socketSendDelay || 100,
    consoleLogDelay: options.consoleLogDelay || 1000,
    dbWriteDelay: options.dbWriteDelay || 20,
    mqttTimeout: options.mqttTimeout || 600,
    verboseLogging: options.verboseLogging || false,
    mongoEnabled: options.mongoEnabled,
  };

  logger.info('MQTT options:');
  Object.entries(opts).forEach(([key, val]) => {
    logger.info(`    ${key}: ${val}`);
  });
  logger.info('');

  state.mqttTimeout = setTimeout(() => {
    logger.warn(`No data from car in over ${opts.mqttTimeout} ms`);

    socket.sendConnectionStatus('NO DATA');
    state.isReceivingData = false;
  }, opts.mqttTimeout);

  logger.info('MQTT timeout interval set');

  logger.info('Activating MQTT hooks');

  activateConnectHook(client);
  activateDisconnectHook(client);
  activateMessageHook(client, opts);

  logger.info('Hooks activated');
}

/**
 * Activates the onConnect MQTT hook
 *
 * @param {mqtt.Client} client The MQTT client
 */
function activateConnectHook(client: mqtt.Client) {
  client.on('connect',() => {
    client.subscribe('hybrid/#');
    client.publish('hybrid/server_log', 'Hello mqtt, tele server is connected');
  });
}

/**
 * Activates the onDisconnect MQTT hook
 *
 * @param {mqtt.Client} client The MQTT client
 */
function activateDisconnectHook(client: mqtt.Client) {
  client.on('disconnect', () => {
    socket.sendConnectionStatus('DISCONNECTED');
  });
}

/**
 * Activates the onMessage MQTT hook
 *
 * @param {mqtt.Client} client The MQTT client
 * @param {MQTTOptions} options The MQTT options
 */
function activateMessageHook(client: mqtt.Client, options: MQTTOptions) {
  client.on('message', (topic, message) => {
    if (topic === 'hybrid/server_log') {
      return;
    }

    if (!state.isReceivingData) {
      logger.info('Receiving MQTT data');
      state.isReceivingData = true;
    }

    const {
      receive_time,
      parsed_message,
    } = parseMessage(message);

    state.nextOutput[topic] = parsed_message;
    state.nextOutput['time'] = receive_time;

    if (options.verboseLogging && receive_time - state.consoleLastSent > options.consoleLogDelay) {
      logger.info(state.nextOutput);
      state.consoleLastSent = receive_time;
    }

    if (receive_time - state.socketLastSent > options.socketSendDelay) {
      socket.sendData(state.nextOutput);
      socket.sendConnectionStatus('CONNECTED');

      state.mqttTimeout.refresh();
      state.socketLastSent = receive_time;
    }

    if (options.mongoEnabled && receive_time - state.dbLastSent > options.dbWriteDelay){
      const outputs_equal = isEqual(
        {...state.lastDbOutput, time: undefined},
        {...state.nextOutput, time: undefined}
      );

      if (!outputs_equal) {
        storage.writeData(state.nextOutput);
        delete state.nextOutput['_id'];
        state.dbLastSent = receive_time;
        state.lastDbOutput = {...state.nextOutput};
      } else {
        // console.debug('No change in data, not written to db')
      }
    }
  });
}

/**
 * Represents a parsed MQTT message
 */
type MQTTMessage = {
  receive_time: number,
  parsed_message: string
};

/**
 * Parses an MQTT message
 *
 * @param {Buffer} message The raw MQTT message
 *
 * @return {MQTTMessage} The parsed message
 */
function parseMessage(message: Buffer): MQTTMessage {
  const msgStr = message.toString();
  return {
    receive_time: new Date().getTime(),
    parsed_message: msgStr.substring(msgStr.indexOf(':') + 1),
  };
}
