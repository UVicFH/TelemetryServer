# UVic Formula Hybrid Telemetry Backend

## Setup

### Setup Telemtry Server

Install Node.js 10 (preferably using nvm).  
Double check npm is installed: `npm -v`.  
run `npm install` to install all required dependencies.

### MQTT Setup

#### MQTT Local Broker

A local broker should be setup soon for production test runs.

#### MQTT Test Broker

Actually you don't need to! mosquito.org actually does this for us (albeit in a slow manner).  
In `mqtt/service.js` point the client to `mqtt://test.mosquitto.org:1883`.

### MongoDB

To setup MongoDB on a mac you can use brew. If you don't have brew already, run:
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`.

Then install mongoDB if you don't have it already (which you probably done) using
`brew install mongoDB`. Otherwise install it via `apt-get` on linux, or a download from their site.

Then run `mkdir data` to make a folder which will be the data's home.

And that's it, MongoDB is set up. If you want to run it to make sure it spins up,
run `mongod --dbpath=./data` and make sure it doesn't error out.

## Dev

## Learn

[Node.js](https://nodejs.org/)  
[Express.js](https://expressjs.com/)  
[MQTT.js](https://github.com/mqttjs/MQTT.js)  
[Socket.io](https://socket.io/)

[MosQuiTTo](mosquitto.org)
