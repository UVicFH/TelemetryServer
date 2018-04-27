/**
 * @file Socket.IO Server - External API
 */

const socket_server = require('./service').get_service();
const logic = require.main.require('./logic/handle_socket');

/**
 * Activate Socket.IO API
 */
const activate_socket_server = function() {
  socket_server.on('connection', function(socket) {
    console.log(`Websocket Connected with client -> ${socket})`);
    logic.handle_connect(socket);
  });
};

module.exports = {
  activate: activate_socket_server
};
