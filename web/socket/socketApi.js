/**
 * @file Socket.IO Server - External API
 */

const socket_server = require('./socketService');

/**
 * Activate Socket.IO API
 */
const activate_socket_server = function() {
  socket_server.on('connect', function(socket) {
    console.info(`Websocket Connected with client -> ${socket})`);
  });

  socket_server.on('disconnect', socket => {
    console.info('Websocket disconnected');
  });
};

module.exports = {
  activate: activate_socket_server,
};
