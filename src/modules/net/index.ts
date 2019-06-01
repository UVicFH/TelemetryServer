/**
 * @file Express server routes etc
 *
 * @author Jayden Chan
 * @author Brendon Earl
 * @author Chad McColm
 */

import { join } from 'path';
import { createServer } from 'http';
import * as express from 'express';

import { getLogger } from '../logger';
import * as socket from './socket';

const logger = getLogger('net');

export function run() {
  logger.info('Initializing Express/HTTP/socket.io');
  let expressApp, io;

  try {
    expressApp = express();
    const httpServer = createServer(expressApp);
    socket.init(httpServer);
  } catch (e) {
    logger.error('Failed to initialize network module');
    logger.error(e);

    throw e;
  }

  logger.info('Successfully initialized Express/HTTP/socket.io');

  expressApp.use(express.static(join(__dirname, '/public')));
  logger.info('Express configured to serve static /public folder');
}
