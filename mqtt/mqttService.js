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

  console.info('Initializing MQTT client');

  // connect client to mqtt broker
  try {
    mqtt_client = mqtt.connect('mqtt://localhost:1883');
    console.info('MQTT client initialize successfully!');
  } catch (error) {
    console.error(`MQTT client failed to initialize due to: ${error}`);
    throw error;
  }
};

/**
 * Get MQTT client instance if available
 */
const get_mqtt_client = function() {
  if (mqtt_client === undefined) init_mqtt_client();
  return mqtt_client;
};

module.exports = get_mqtt_client();
