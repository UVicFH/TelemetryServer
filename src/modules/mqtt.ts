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
};

const CONSOLE_DELAY = 1000;
const SOCKET_DELAY = 200;
const DB_DELAY = 20;
const MQTT_TIMEOUT = 600;

/**
 * Initialize the MQTT client
 *
 * @return {boolean} Whether the initialization was successful
 */
export function init(mongoEnabled: boolean): boolean {
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

  logger.info('MQTT client initialized successfully, setting MQTT no data timeout');

  state.mqttTimeout = setTimeout(() => {
    logger.warn(`No data from car in over ${MQTT_TIMEOUT} ms`);

    socket.sendConnectionStatus('NO DATA');
  }, MQTT_TIMEOUT);

  logger.info('MQTT timeout interval set');
  return true;
}

/**
 * Activates the MQTT event hooks
 *
 * @param {boolean} mongoEnabled Whether to write to Mongo
 * @param {number} [socketDelay] Milliseconds to wait between socket updates
 */
export function activate(mongoEnabled: boolean, socketDelay?: number) {
  client.on('connect',() => {
    client.subscribe('hybrid/#');
    client.publish('hybrid/server_log', 'Hello mqtt, tele server is connected');
  });

  client.on('disconnect', () => {
    // TODO: uncomment / fix this line once the socket stuff is working
    socket.sendConnectionStatus('DISCONNECTED');
  });

  client.on('message', (topic, message) => {
    if (topic === 'hybrid/server_log') return;

    const socketDelayMs = socketDelay || SOCKET_DELAY;

    const {
      receive_time,
      parsed_message,
    } = parseMessage(message);

    state.nextOutput[topic] = parsed_message;
    state.nextOutput['time'] = receive_time;

    if (receive_time - state.consoleLastSent > CONSOLE_DELAY) {
      logger.info(state.nextOutput);
      state.consoleLastSent = receive_time;
    }

    if (receive_time - state.socketLastSent > socketDelayMs) {
      socket.sendData(state.nextOutput);
      socket.sendConnectionStatus('CONNECTED');

      state.mqttTimeout.refresh();
      state.socketLastSent = receive_time;
    }

    if (mongoEnabled && receive_time - state.dbLastSent > DB_DELAY){
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
