const express = require("express");
const app = express();
require("./api/routes")(app);
app.listen(3000, () => console.log("Example app listening on port 3000!"));

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org");
require("./api/mqttclient")(client);
