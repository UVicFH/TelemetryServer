/**
 * @file Socket.IO Server - Core Service
 */

const http = require('http');
const socket_io = require('socket.io');

const express_app = require(__base + '/httpService');

let socket_server;

/**
 * Initialize Socket.io server
 */
const init_socket_server = async function() {
  if (express_app === undefined)
    throw 'No express app setup for socket server init';
  if (socket_server !== undefined) throw 'Socket server already initialized';

  console.log('Initializing Socket.IO server');

  try {
    // connect Express app to http server
    const http_server = http.Server(express_app);
    // then bind server to Socket.io
    socket_server = socket_io(http_server);

    await http_server.listen(
      {
        host: 'localhost',
        port: 3000
      },
      () => {
        console.log(
          'Socket.IO server initialize and API activated succesfully, and is listening on port 3000!'
        );
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

module.exports = {
  default: get_socket_server()
};
