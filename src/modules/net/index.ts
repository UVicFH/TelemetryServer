/**
 * @file Express server routes etc
 *
 * @author Jayden Chan
 * @author Brendon Earl
 * @author Chad McColm
 */

import { join } from 'path';
import { createServer, Server } from 'http';
import * as express from 'express';

import { getLogger } from '../logger';
import * as socket from './socket';

const logger = getLogger('net');

const SERVER_HOST_ADDR = '0.0.0.0';

let httpServer: Server;

/**
 * Initalizes Express/HTTP server
 *
 * @return {boolean} Whether the initialization was successful
 */
export function init(): boolean {
  logger.info('Initializing Express/HTTP/socket.io');

  try {
    const expressApp = express();

    expressApp.use(express.static(join(__dirname, '/public')));
    logger.info('Express configured to serve static /public folder');

    httpServer = createServer(expressApp);

    return true;
  } catch (e) {
    logger.error('Failed to initialize network module');
    logger.error(e);

    return false;
  }
}

/**
 * Activates the HTTP server and socket
 *
 * @param {number} port The port to listen on
 */
export function activate(port: number) {
  if (!httpServer) {
    throw new Error(`HTTP server isn't initialized!`);
  }

  socket.activate(httpServer);

  httpServer.listen({
    host: SERVER_HOST_ADDR,
    port,
  }, () => {
    logger.info(`Net module successfully initialized, listening on port ${port}`);
  });
}
