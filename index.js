// Require packages for mqtt, express, and scoket.io and make objects of their instances
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost')
var app = require('express')()
var express = require('express')
var http = require('http').Server(app)
var io = require('socket.io')(http)

// Set timeouts for actions of server
var console_timeout = 1000
var io_timeout = 100

// Initialize the lastsend trackers with the current time in milliseconds
var console_lastsend = new Date().getTime();
var io_lastsend = new Date().getTime();

// Tell the website to use the public folder instead of the main folder
app.use("/public", express.static(__dirname + "/public"))

// When the website recieves a request at the root, serve them the public/index.html file
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
})

// Listen for new HTTP connections on port 80 (default port over web)
http.listen(80, '0.0.0.0', function(){
    console.log('listening on *:80');
})

// When the MQTT client connects to the localhost server, subscribe it to all messages under the topic "hybrid"
client.on('connect', function () {
    client.subscribe('hybrid/#')
})

// When a socket client connects, note in the log
io.on('connection', function(socket){
    console.log('A new client has connected');
})

var data;

// When a message is received by the MQTT client, do the following
client.on('message', function(topic, message){

    // Check the current time
    var iteration_time = new Date().getTime()

    // Parse the message recieved over MQTT into the global data structure
    received = JSON.parse(message.toString())
    data = {...data, ...received}

    // If enough time has passed to log to the console, do that
    if(iteration_time - console_lastsend > console_timeout){
        console.log(data);
        console_lastsend = iteration_time;
    }

    if(iteration_time - io_lastsend > io_timeout){
        io.emit("dataset", data);
        io_lastsend = iteration_time;
    }

    // If enough time has passed to send over socket.io, do that

})