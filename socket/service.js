const http = require("http");
const socket_io = require("socket.io");

const init_server = function(app) {
  console.log("Initializing Socket.io server");
  try {
    const server = http.Server(app);
    socket_io(server);
    server.listen(3000, () =>
      console.log(
        "Socket.io server initialize successfully and is listening on port 3000!"
      )
    );
  } catch (error) {
    console.error(`Socket.io server failed to initialize due to: ${error}`);
    throw error;
  }
};

module.exports = function(app) {
  init_server(app);
};
