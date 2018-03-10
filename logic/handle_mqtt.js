const data_store_actions = require("../storage/actions");
const socket_actions = require("../socket/actions");

module.exports = {
  handle_connect: client => {
    client.subscribe("presence");
    client.publish("presence", "Hello mqtt");
  },
  handle_message: (client, { topic, message }) => {
    // message is Buffer
    console.log("handling mqtt message");
    console.log(`topic: ${topic.toString()}`);
    console.log(`msg: ${message.toString()}`);

    data_store_actions.write_data({ msg: message.toString() });
    socket_actions.send_data({ msg: message.toString() });
    client.end();
  }
};
