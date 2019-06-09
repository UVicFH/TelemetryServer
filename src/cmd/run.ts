/**
 * @file Entry point for main service
 *
 * @author Jayden Chan
 */

// Libraries
import { Arguments } from 'yargs';

// Modules
import { getLogger } from '../modules/logger';
import * as mqtt from '../modules/mqtt';
import * as net from '../modules/net';
import { openConnection } from '../modules/storage';

const logger = getLogger('run');

const DEFAULT_PORT = 3000;

export const command = 'run';
export const desc = 'Read and process incomming MQTT messages';

// Make this the default command
export const aliases = ['$0'];

export async function handler(argv: Arguments) {
  if (!net.init()) {
    logger.debug('Net module init failed');
    return;
  }

  if (!argv.noMongo) {
    logger.info('Connecting to Mongo');
    try {
      await openConnection();
    } catch (e) {
      logger.error('Failed to connect to Mongo');
      return;
    }
  }

  if (!mqtt.init()) {
    logger.debug('MQTT Init failed');
    return;
  }

  logger.info('Initialization successful, activating services');

  const mqttOptions: mqtt.MQTTOptions = {
    socketSendDelay: argv.socketSendDelay as number || 200,
    consoleLogDelay: argv.consoleLogDelay as number || 1000,
    dbWriteDelay: argv.dbWriteDelay as number || 20,
    mqttTimeout: argv.mqttTimeout as number || 600,
    verboseLogging: argv.verboseLogging as boolean || false,
    mongoEnabled: !argv.noMongo as boolean,
  };

  mqtt.activate(mqttOptions);
  net.activate(argv.port as number || DEFAULT_PORT);
}

export const builder = {
  noMongo: {
    alias: 'm',
    type: 'boolean',
    describe: 'Do not log the telemetry data to Mongo',
  },
  port: {
    alias: 'p',
    type: 'number',
    describe: 'The port to run on',
  },
  socketSendDelay: {
    alias: 's',
    type: 'number',
    describe: 'Millis between socket updates',
  },
  consoleLogDelay: {
    alias: 'c',
    type: 'number',
    describe: 'Millis between console updates',
  },
  dbWriteDelay: {
    alias: 'd',
    type: 'number',
    describe: 'Millis between db updates',
  },
  mqttTimeout: {
    alias: 't',
    type: 'number',
    describe: 'Millis before considering MQTT conn lost',
  },
  verboseLogging: {
    alias: 'v',
    type: 'boolean',
    describe: 'Log the MQTT data in the console',
  },
};
