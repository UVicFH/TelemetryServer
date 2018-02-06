const app = require("./express/service");

require("./socket/service")(app);

require("./mqtt/service");
