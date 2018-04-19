const socket_server = require("./service").get_service();

/**
 * Send data via Socket.IO
 * @param {*} data
 */
const send_data = data => {
  console.log("Sending Websocket data");
  socket_server.emit("tele_data", { ...data });
};

module.exports = {
  send_data
};
