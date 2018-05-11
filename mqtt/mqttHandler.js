/**
 * @file MQTT Handler - Trigger Actions in Other Services
 */

const data_store_actions = require(__base + '/storage/storageActions');
const socket_actions = require(__base + '/socket/socketActions');
const TIMEOUT = 500;

module.exports = {
  handle_connect: client => {
    client.subscribe('hybrid/#');
    client.publish('hybrid/#', 'Hello mqtt');
  },
  handle_message: (client, { topic, message }) => {
    // message is Buffer
    console.info(
      `handling mqtt message\n` +
        `topic: ${topic.toString()}\n` +
        `msg: ${message.toString()}\n`
    );

    data_store_actions.write_data({ msg: message.toString() });
    // TODO: change msg & document why
    conole.log(Object.keys(message));
    socket_actions.send_data({ msg: message.toString() });
    client.end();
  }
};
