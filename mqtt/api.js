const mqtt_client = require("./service").get_service();
const logic = require.main.require("./logic/handle_mqtt");

/**
 * Activate MQTT API
 */
const activate_mqtt_client = function() {
  mqtt_client.on("connect", function() {
    logic.handle_connect(mqtt_client);
  });

  mqtt_client.on("message", function(topic, message) {
    logic.handle_message(mqtt_client, { topic, message });
  });
};

module.exports = {
  activate: activate_mqtt_client
};
