var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org");
require("./api")(client);

module.exports = mqtt;
