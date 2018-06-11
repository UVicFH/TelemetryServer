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

### Patterns

Each module can contain four files: `index`, `actions`, `api`, `service`

Index files are automatically pulled when requiring a folder. For example: `require('base/moduleN')` will
import the `module.exports` in `base/moduleN/index.js`. Each index imports the `module.exports` from the other
files in the folder, and exports them for a standard api between modules.

Modules work in an isolated fashion where the `service` is what configures and initialized the library used. The `api`
file controls that module's external interface. While the `actions` file exposes functions for other modules to
use in order to interact with that module.

### Conventions

There are four modules in this project: `mqtt`, `storage`, `http`, and `socket`. Each server a
critical function in the telemetry data cycle.

#### mqtt

MQTT is the telemetry protocol used to communicate between the vehicle and server. It's comprised
of two roles: Broker and Client.

We're using the [MQTT.js](https://github.com/mqttjs/MQTT.js) library to abstract away the complexities of
the network layer. While the MQTT broken being used is [MosQuiTTo](mosquitto.org).

#### storage

Currently the storage technology used is MongoDB. This may change to sqlite soon based on developer availability.
Regardless, the internal api exposed in the `actions` file should stay the same while the service is swapped, so
there is little to take into consideration when working on the rest of the project.

#### http

For our http server we use [Express.js](https://expressjs.com/). It is currently unused as an endpoint server, but may be used soon
for commands the web client can send back such as 'flag event' or 'download information'. It currently
serves as the http client that the socket library sits on top of.

#### socket

[Socket.io](https://socket.io/) is the 'websocket' library of choice. While it doesn't interact directly with
standard websockets, this library follows the standard websocket api to a tee.

## Learn

[Node.js](https://nodejs.org/)
