/**
 * @file Socket.IO Server - External API
 */

const socket_server = require('./socketService').default;
const socket_actions = require('./socketActions');

/**
 * Activate Socket.IO API
 */
const activate_socket_server = function() {
  socket_server.on('connection', function(socket) {
    console.log(`Websocket Connected with client -> ${socket})`);
    socket_actions.send_data({ hello: 'world' });
  });
};

module.exports = {
  activate: activate_socket_server
};
