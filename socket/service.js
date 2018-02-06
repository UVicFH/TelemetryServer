module.exports = function(app) {
  const server = require("http").Server(app);
  require("socket.io")(server);
  server.listen(3000, () => console.log("Example app listening on port 3000!"));
};
