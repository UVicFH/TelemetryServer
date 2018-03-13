const http = require("http");
const socket_io = require("socket.io");

let socket_server;

/**
 * Initialize Socket.io server
 * @param {Express object} app - app to connect to http server
 */
const init_socket_server = async function(app) {
  if (app === undefined) throw "No express app passed to socket server init";
  if (socket_server !== undefined) throw "Socket server already initialized";

  console.log("Initializing Socket.IO server");

  try {
    // connect Express app to http server
    const http_server = http.Server(app);
    // then bind server to Socket.io
    socket_server = socket_io(http_server);

    await http_server.listen(
      {
        host: "localhost",
        port: 3000
      },
      () => {
        console.log(
          "Socket.IO server initialize and API activated succesfully, and is listening on port 3000!"
        );
      }
    );
  } catch (error) {
    console.error(`Socket.IO server failed to initialize due to: ${error}`);
    throw error;
  }
};

/**
 * Get socket server instance if available
 */
const get_socket_server = function() {
  if (socket_server === undefined) throw "No socket_server exists";
  return socket_server;
};

module.exports = {
  init: init_socket_server,
  get_service: get_socket_server
};
