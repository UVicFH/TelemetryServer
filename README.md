# UVic Formula Hybrid Telemetry Backend

## Using

### Viewing Data Live Once the data stream has started you can view data live. From the
local computer navigate to `localhost:3000` in a web browser. You will need your local IP
address for devices on the same network to connect. To find it open command line and type
`ipconfig` and note your IPv4 Address (for example: 192.168.1.118). Devices on the
network can navigate to `192.168.1.118:3000` in a web browser to see the data stream.

### Viewing Logged Data There are many ways to see the data that has been logged in the
Mongo database depending on how you want to deal with the data after.

### Export Mongo data to CSV (comma separated values) Exporting the data to CSV is an
easy way to view it in other programs like Excel. To filter the data to a time period you
want, you can use a filter query on the time field of the data.

To export all the data from the database open command prompt and navigate to the output
folder you want and enter `mongoexport -d telemetry -c snapshots --type=csv --fields
time,hybrid/engine/temperature -o output.csv` replacing the output file with the location
of your choice and the fields with the fields you want. Make sure there are no spaces in
the fields list.

If you want to export JSON use: `mongoexport -d telemetry -c snapshots -o output.json`.

To specify a time you need to know the unix time (in milliseconds) of the start and end.
I use this online service to determine those https://www.epochconverter.com/ because it
let's me input time zone info. Then you add that query to your data export like so
`mongoexport -d telemetry -c snapshots --type=csv --fields time,hybrid/engine/temperature
-o outputfilter.csv --query "{time: {$gte: 1529971200000, $lte: 1529971500000}}"`. This
is data between 5PM and 5:05PM on July 25, 2018.

## Setup

### Setup Telemetry Server

Install Node.js 10 (preferably using nvm). Double check npm is installed: `npm -v`. Run
`npm install` to install all required dependencies.

### MQTT Setup

#### MQTT Local Broker

A local broker should be setup soon for production test runs.

#### MQTT Test Broker

Actually you don't need to! mosquito.org actually does this for us (albeit in a slow
manner).  In `mqtt/service.js` point the client to `mqtt://test.mosquitto.org:1883`.

### MongoDB

To setup Mongo on a mac you can use brew. If you don't have brew already, run:
`/usr/bin/ruby -e "$(curl -fsSL
https://raw.githubusercontent.com/Homebrew/install/master/install)"`.

Then install Mongo if you don't have it already (which you probably done) using `brew
install mongoDB`. Otherwise install it via `apt-get` on Linux, or a download from their
site.

Then run `mkdir data` to make a folder which will be the data's home.

And that's it, MongoDB is set up. If you want to run it to make sure it spins up, run
`mongod --dbpath=./data` and make sure it doesn't error out.

## Dev

### Patterns

Each module can contain four files: `index`, `actions`, `api`, `service`

Index files are automatically pulled when requiring a folder. For example:
`require('base/moduleN')` will import the `module.exports` in `base/moduleN/index.js`.
Each index imports the `module.exports` from the other files in the folder, and exports
them for a standard api between modules.

Modules work in an isolated fashion where the `service` is what configures and
initialized the library used. The `api` file controls that module's external interface.
While the `actions` file exposes functions for other modules to use in order to interact
with that module.

### Conventions

There are four modules in this project: `mqtt`, `storage`, `http`, and `socket`. Each
server a critical function in the telemetry data cycle.

#### MQTT

MQTT is the telemetry protocol used to communicate between the vehicle and server. It's
comprised of two roles: Broker and Client.

We're using the [MQTT.js](https://github.com/mqttjs/MQTT.js) library to abstract away the
complexities of the network layer. While the MQTT broker being used is
[MosQuiTTo](mosquitto.org).

#### storage

Currently the storage technology used is MongoDB. This may change to SQLite soon based on
developer availability.  Regardless, the internal api exposed in the `actions` file
should stay the same while the service is swapped, so there is little to take into
consideration when working on the rest of the project.

#### http

For our http server we use [Express.js](https://expressjs.com/). It is currently unused
as an endpoint server, but may be used soon for commands the web client can send back
such as 'flag event' or 'download information'. It currently serves as the http client
that the socket library sits on top of.

#### socket

[Socket.io](https://socket.io/) is the 'websocket' library of choice. While it doesn't
interact directly with standard websockets, this library follows the standard websocket
api to a tee.

### Simulating Incoming Data If you would like to test the server you can run MQTT Data
Sender.py which simulates data from a few signals from the car just sweeping across a
range to demonstrate the server is functional.

## Learn

[Node.js](https://nodejs.org/)
