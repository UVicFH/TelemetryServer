/**
 * @file Socket.IO Server - Core Service
 */

const http = require('http');
const socket_io = require('socket.io');

const express_app = require('../../web/http').service;

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;

let socket_server;

/**
 * Initialize Socket.io server
 */
const init_socket_server = async function() {
  if (express_app === undefined) {
    throw new Error('No express app setup for socket server init');
  }

  if (socket_server !== undefined) {
    throw new Error('Socket server already initialized');
  }

  console.info('Initializing Socket.IO server');

  try {
    // connect Express app to http server
    const http_server = http.Server(express_app);
    // then bind server to Socket.io
    socket_server = socket_io(http_server);

    await http_server.listen(
      {
        host: '0.0.0.0',
        port: PORT,
      },
      function() {
        console.info('Socket.IO server initialized and API activated succesfully');
        console.info(`Listening on port ${PORT}...`);
      }
    );
  } catch (error) {
    console.error(`Socket.IO server failed to initialize due to: ${error}`);
    throw error;
  }
};

/**
 * Get socket server instance if available
 */
const get_socket_server = function() {
  if (socket_server === undefined) init_socket_server();
  return socket_server;
};

module.exports = get_socket_server();
