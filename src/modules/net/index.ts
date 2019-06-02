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

export function init() {
  logger.info('Initializing Express/HTTP/socket.io');

  try {
    const expressApp = express();

    expressApp.use(express.static(join(__dirname, '/public')));
    logger.info('Express configured to serve static /public folder');

    httpServer = createServer(expressApp);

    socket.init(httpServer);

  } catch (e) {
    logger.error('Failed to initialize network module');
    logger.error(e);

    throw e;
  }
}

export function activate(port: number) {
  if (!httpServer) {
    throw new Error(`HTTP server isn't initialized!`);
  }

  httpServer.listen({
    host: SERVER_HOST_ADDR,
    port,
  }, () => {
    logger.info(`Net module successfully initialized, listening on port ${port}`);
  });
}
