const logic = require.main.require("logic/handle_socket");

module.exports = function(io) {
  io.on("connection", function(socket) {
    logic.handle_connect(socket);
  });
};
