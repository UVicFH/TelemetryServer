const web_comm = require("./service");

const send_data = data => {
  web_comm.socket.emit("news", { data });
};

module.exports = {
  send_data
};
