# UVic Formula Hybrid Telemetry Backend

## Setup

### Setup Telemtry Server

Install Node.js.  
Double check npm is installed: `npm -v`.  
run `npm install` to install all required dependencies.

### Setup MQTT

#### MQTT Local Broker

#### MQTT Test Broker

Actually you don't need to! mosquito.org actually does this for us.  
In `mqtt/service.js` point the client to `mqtt://test.mosquitto.org:1883`.

### MongoDB

Make sure you have brew setup, if you don't run `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`.

Then install mongoDB if you don't have it already (which you probably done) using
`brew install mongoDB`.

Then run `mkdir data` to make a folder which will be the data's home.

then run `mongod --dbpath=./data` to spin up a mongoDB service to hold your data

## Dev

`npm install mqtt -g`

## Learn

[Node.js](https://nodejs.org/)  
[Express.js](https://expressjs.com/)  
[MQTT.js](https://github.com/mqttjs/MQTT.js)  
[Socket.io](https://socket.io/)

[MosQuiTTo](mosquitto.org)
