const app = require("express")();
require("./api/routes")(app);

const server = require("http").Server(app);
require("socket.io")(server);
server.listen(3000, () => console.log("Example app listening on port 3000!"));

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://test.mosquitto.org");
require("./api/mqttclient")(client);
