const mqtt = require("mqtt");
const mqtt_api = require("./api");

/**
 * Initialize MQTT server
 */
const init_mqtt = function() {
  console.log("Initializing MQTT server");
  let client;

  // connect client to mqtt broker
  try {
    client = mqtt.connect("mqtt://test.mosquitto.org:1883");
    console.log("MQTT server initialize successfully!");
  } catch (error) {
    console.error(`MQTT server failed to initialize due to: ${error}`);
    throw error;
  }

  // connect api methods to mqtt client
  mqtt_api(client);
};

module.exports = function() {
  init_mqtt();
};
