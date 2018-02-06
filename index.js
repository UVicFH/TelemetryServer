const app = require("./express/service");

const server = require("http").Server(app);
require("socket.io")(server);
server.listen(3000, () => console.log("Example app listening on port 3000!"));

require("./mqtt/service");
