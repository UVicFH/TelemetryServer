# Pre-requisites

Download the mosquitto zip folder from https://github.com/chadjmccolm/telemetry-server/blob/master/mosquitto.zip and unzip to memorable location.

Download and install the latest version of Node.JS from here: https://nodejs.org/en/download/

# Setup

Make sure connected to UVicHybrid network (password is the usual). IPV4 address must be 192.168.1.41, subnet 255.255.255.0, and gateway 192.168.1.1.

Make sure mosquitto service is running. In folder: `mosquitto.exe`

Make sure that mqtt, express, socket.io is in installed. Use `npm install mqtt` and equivalent in the project folder to do this. 

# Use

If you want to see all incoming data over MQTT, in the MQTT install location run: `mosquitto_sub.exe -v -t "hybrid/#"`

This will subscribe to all topics under the hybrid one and show data in verbose (with topic and message)

To start the node server navigate the command line to it's folder and type `npm start`.

This will create a web server at port 80 that shows all data in a javascript object from the vehicle. It will also send socket.io messages from the same server location and port. There is no server-side datalogging. That will all happen on the vehicle to the locally installed USB stick. 