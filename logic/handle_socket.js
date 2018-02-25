const socket_actions = require("../socket/actions");

module.exports = {
  handle_connect: socket => {
    socket_actions.send_data("news", { hello: "world" });
  }
};
