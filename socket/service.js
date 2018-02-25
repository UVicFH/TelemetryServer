const http = require("http");
const socket_io = require("socket.io");

/**
 * Initialize Socket.io server
 * @param {Express object} app - app to connect to http server
 */
const init_server = async function(app) {
  console.log("Initializing Socket.io server");

  try {
    // connect Express app to http server
    const server = http.Server(app);
    // then bind server to Socket.io
    socket_io(server);
    module.exports.socket = await server.listen(3000, () =>
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
