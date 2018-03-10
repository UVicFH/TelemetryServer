const logic = require.main.require("./logic/handle_socket");

module.exports = function(io) {
  io.on("connection", socket => {
    console.log(`Websocket Connected with client -> ${socket})`);
    logic.handle_connect(socket);
  });
};
