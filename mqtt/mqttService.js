/**
 * @file MQTT Client - Core Service
 */

const mqtt = require('mqtt');

let mqtt_client;

/**
 * Initialize MQTT client
 */
const init_mqtt_client = function() {
  if (mqtt_client !== undefined) throw 'MQTT client already initialized';

  console.log('Initializing MQTT client');

  // connect client to mqtt broker
  try {
    mqtt_client = mqtt.connect('mqtt://test.mosquitto.org:1883');
    console.log('MQTT client initialize successfully!');
  } catch (error) {
    console.error(`MQTT client failed to initialize due to: ${error}`);
    throw error;
  }
};

/**
 * Get MQTT client instance if available
 */
const get_mqtt_client = function() {
  if (mqtt_client === undefined) throw 'No mqtt_client exists';
  return mqtt_client;
};

module.exports = {
  init: init_mqtt_client,
  get_service: get_mqtt_client
};
