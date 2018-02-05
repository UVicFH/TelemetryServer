module.exports = {
  handle_connect: function(client) {
    client.subscribe("presence");
    client.publish("presence", "Hello mqtt");
  },
  handle_message: function(client, { topic, message }) {
    // message is Buffer
    console.log(message.toString());
    client.end();
  }
};
