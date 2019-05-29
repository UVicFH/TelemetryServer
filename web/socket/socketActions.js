/**
 * @file Socket.IO Server - Internal Actions
 */

const socket_server = require('./socketService');

/**
 * Send data via Socket.IO
 * @param {*} data
 */
const send_data = (data) => {
  // console.debug('Sending data over websocket');
  socket_server.emit('tele_data', data);
};

/**
 * Send data ranges via Socket.IO
 * @param {Object} range - object containing key, min, & max
 * @param {String} range.key - variable key string
 * @param {Number} range.min - object containing key, min, & max
 * @param {Number} range.max - object containing key, min, & max
 */
const send_range = (range) => {
  // console.debug('Sending ranges over websocket');
  socket_server.emit('tele_range', range);
};

/**
 * Send an MQTT connection status update to the connected
 * socket clients
 *
 * @param {String} status One of either `DISCONNECTED`, `CONNECTED`, or `NO DATA`
 */
const send_connection_status = (status) => {
  socket_server.emit('tele_connection_status', status);
};

module.exports = {
  send_data,
  send_range,
  send_connection_status,
};
