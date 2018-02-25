const app = require("./express/service")();

require("./socket/service")(app);

require("./mqtt/service")();

const data_store = require("./storage/service").open_connection();
