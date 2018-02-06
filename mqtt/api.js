const logic = require.main.require("./logic/handle_mqtt");

module.exports = function(client) {
  client.on("connect", function() {
    logic.handle_connect(client);
  });

  client.on("message", function(topic, message) {
    logic.handle_message(client, { topic, message });
  });
};
