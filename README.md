# UVic Formula Hybrid Telemetry Backend

## Setup

### Setup Telemtry Server

Install Node.js.  
Double check npm is installed: `npm -v`.  
run `npm install` to install all required dependencies.

### Setup MQTT Broker

### Setup MQTT Test Broker

Actually you don't need to! mosquito.org actually does this for us.  
In `mqtt/service.js` point the client to `mqtt://test.mosquitto.org:1883`.

## Dev

`npm install mqtt -g`

## Learn

[Node.js](https://nodejs.org/)  
[Express.js](https://expressjs.com/)  
[MQTT.js](https://github.com/mqttjs/MQTT.js)  
[Socket.io](https://socket.io/)

[MosQuiTTo](mosquitto.org)
