/**
 * @file Socket.IO Handler - Trigger Actions in Other Services
 */

const socket_actions = require('../socket/actions');

module.exports = {
  handle_connect: socket => {
    socket_actions.send_data({ hello: 'world' });
  }
};
