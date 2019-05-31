/**
 * @file MQTT receiving and processing
 *
 * @author Jayden Chan
 * @author Brendon Earl
 */

import * as mqtt from 'mqtt';
import { getLogger } from './logger';

import { writeData } from '../modules/storage';

const BROKER_ADDR = 'mqtt://localhost:1883';

const logger = getLogger('mqtt.ts');
let client: mqtt.Client;

const state = {
  nextOutput: {},
  lastDbOutput: {},
  consoleLastSent: 0,
  socketLastSent: 0,
  dbLastSent: 0,
  mqttInterval: undefined,
};

const CONSOLE_DELAY = 1000;
const SOCKET_DELAY = 200;
const DB_DELAY = 20;
const MQTT_TIMEOUT = 600;

/**
 * Initialize the MQTT client
 *
 * @return Whether the initialization was successful
 */
export function init(): boolean {
  if (client !== undefined) throw 'MQTT client already initialized';

  logger.info('Initializing MQTT client');

  // Connect client to mqtt broker
  client = mqtt.connect(BROKER_ADDR);
  if (!client.connected) {
    logger.error(`MQTT client failed to initialize`);
    return false;
  }

  logger.info('MQTT client initialized successfully, setting MQTT no data timeout');

  state.mqttInterval = setInterval(() => {
    logger.warn(`No data from car in over ${MQTT_TIMEOUT} ms`);

    // TODO: uncomment / fix this line once the socket stuff is working
    // socket_actions.send_connection_status('NO DATA');
  }, MQTT_TIMEOUT);

  return true;
}

export function activate() {
  client.on('connect', function() {
    client.subscribe('hybrid/#');
    client.publish('hybrid/server_log', 'Hello mqtt, tele server is connected');
  });

  client.on('disconnect', () => {
    // TODO: uncomment / fix this line once the socket stuff is working
    // socket_actions.send_connection_status('DISCONNECTED');
  });

  client.on('message', function(topic, message) {
    if (topic === 'hybrid/server_log') return;

    const receive_time = new Date().getTime();
    let parsed_message = message.toString();
    parsed_message = parsed_message.substring(parsed_message.indexOf(':')+1);

    state.nextOutput[topic] = parsed_message;
    state.nextOutput['time'] = receive_time;

    if (receive_time - state.consoleLastSent > CONSOLE_DELAY) {
      console.log(state.nextOutput);
      state.consoleLastSent = receive_time;
    }

    if (receive_time - state.socketLastSent > SOCKET_DELAY) {
      // TODO: uncomment / fix this line once the socket stuff is working
      // socket_actions.send_data(state.nextOutput);
      // socket_actions.send_connection_status('CONNECTED');

      state.mqttInterval.refresh();
      state.socketLastSent = receive_time;
    }

    if (receive_time - state.dbLastSent > DB_DELAY){
      const outputs_equal = _.isEqual(
        {...state.lastDbOutput, time: undefined},
        {...state.nextOutput, time: undefined}
      );

      if (!outputs_equal) {
        writeData(state.nextOutput);
        delete state.nextOutput['_id'];
        state.dbLastSent = receive_time;
        state.lastDbOutput = {...state.nextOutput};
      } else {
        // console.debug('No change in data, not written to db')
      }
    }
  });
}
