const data_store_actions = require("../storage/actions");

module.exports = {
  handle_connect: client => {
    client.subscribe("presence");
    client.publish("presence", "Hello mqtt");
  },
  handle_message: (client, { topic, message }) => {
    // message is Buffer
    console.log("handling message");
    console.log(topic.toString());
    console.log(message.toString());
    data_store_actions.write_data({ msg: message.toString() });
    client.end();
  }
};
