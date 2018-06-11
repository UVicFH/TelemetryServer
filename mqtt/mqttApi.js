/**
 * @file MQTT Client - External API
 */

const mqtt_client = require('./mqttService');

/**
 * Activate MQTT API
 */
const activate_mqtt_client = function() {
  mqtt_client.on('connect', function() {
    mqtt_client.subscribe('hybrid/#');
    mqtt_client.publish('hybrid/#', 'Hello mqtt');
  });

  mqtt_client.on('message', function(topic, message) {
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
    mqtt_client.end();
  });
};

module.exports = {
  activate: activate_mqtt_client
};
