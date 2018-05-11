/**
 * @file Socket.IO Server - External API
 */

const socket_server = require('./socketService').get_service();
const logic = require('./socketHandler');

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
