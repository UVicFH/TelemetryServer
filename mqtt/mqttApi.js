/**
 * @file MQTT Client - External API
 */

// Config vars
const CONSOLE_TIMEOUT = 1000;
const SOCKET_TIMEOUT = 100;
const DB_TIMEOUT = 20;

 // Libraries
const _ = require('lodash')

// Core service
const mqtt_client = require('./mqttService');

// Other service actions
const socket_actions = require('../web/socket').actions;
const data_store_actions = require('../storage').actions;

// API globals
const next_output = {};
let last_db_output = {}
let console_lastsend = 0;
let socket_lastsend = 0;
let db_lastsend = 0;

/**
 * Activate MQTT API
 */
const activate_mqtt_client = function() {
  mqtt_client.on('connect', function() {
    mqtt_client.subscribe('hybrid/#');
    mqtt_client.publish('hybrid/server_log', 'Hello mqtt, tele server is connected');
  });

  mqtt_client.on('message', function(topic, message) {
    if (topic === 'hybrid/server_log') return;
    
    let receive_time = new Date().getTime();
    let parsed_message = message.toString();
    parsed_message = parsed_message.substring(parsed_message.indexOf(":")+1);

    console.debug(
      `receiving mqtt message\n` +
        `topic: ${topic.toString()}\n` +
        `msg: ${parsed_message}\n`
    );

    next_output[topic] = parsed_message;
    next_output["time"] = receive_time;

    if (receive_time - console_lastsend > CONSOLE_TIMEOUT) {
      console.log(next_output);
      console_lastsend = receive_time;
    }
    
    if (receive_time - socket_lastsend > SOCKET_TIMEOUT) {
      socket_actions.send_data(next_output);
      socket_lastsend = receive_time;
    }
    
    if(receive_time - db_lastsend > DB_TIMEOUT){
      const outputs_equal = _.isEqual(
        {...last_db_output, time: undefined}, 
        {...next_output, time: undefined}
      )
      if (!outputs_equal) {
        data_store_actions.write_data(next_output);
        delete next_output['_id'];
        db_lastsend = receive_time;
        last_db_output = {...next_output};
      } else {
        console.debug('No change in data, not written to db')
      }
    }
  });
};

module.exports = {
  activate: activate_mqtt_client
};
