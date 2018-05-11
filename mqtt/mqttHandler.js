/**
 * @file MQTT Handler - Trigger Actions in Other Services
 */

const data_store_actions = require(__base + '/storage/storageActions');
const socket_actions = require(__base + '/socket/socketActions');

const lastSentRecords = {};
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
    // object for messages which haven't been sent for greater than TIMEOUT
    const prunedMessage = {};
    const now = Date.now();
    // prune message signals
    Object.keys(message).forEach(signalKey => {
      if (now - lastSentRecords[key] > TIMEOUT) {
        // add message signal
        prunedMessage[key] = message[key];
        // reset 'last sent time'
        lastSentRecords[key] = now;
      }
    });
    if (Object.keys(prunedMessage !== 0)) {
      socket_actions.send_data({ msg: prunedMessage.toString() });
    }
    client.end();
  }
};
