const web_comm = require("./service");
// FIXME: web_comm is empty due to circular call tree: https://stackoverflow.com/questions/23875233/require-returns-an-empty-object/23875299
// should re-think architecture

const send_data = data => {
  console.log("Sending Websocket data");
  console.log(web_comm);
  web_comm.socket.emit("tele_data", { data });
};

module.exports = {
  send_data
};
