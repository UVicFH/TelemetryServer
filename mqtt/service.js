var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org:1883");
require("./api")(client);

module.exports = mqtt;
