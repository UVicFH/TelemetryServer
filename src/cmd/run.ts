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
  const netInitResult = net.init();
  if (!netInitResult) {
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

  const mqttInitResult = mqtt.init(!argv.noMongo as boolean);
  if (!mqttInitResult) {
    logger.debug('Init failed');
    return;
  }

  logger.info('Initialization successful, activating services');

  mqtt.activate(!argv.noMongo as boolean, argv.socketSendDelay as number);
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
    describe: 'Milliseconds between socket updates',
  },
};
