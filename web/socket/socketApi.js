/**
 * @file Socket.IO Server - External API
 */

const socket_server = require('./socketService');

/**
 * Activate Socket.IO API
 */
const activate_socket_server = function() {
  socket_server.on('connection', function(socket) {
    console.info(`Websocket Connected with client -> ${socket})`);
  });
};

module.exports = {
  activate: activate_socket_server
};
