process.on("unhandledRejection", r => console.log(r));

const data_store = require("./storage/service").open_connection();

// setTimeout(() => {
const app = require("./express/service")();

require("./socket/service")(app);

require("./mqtt/service")();
// }, 1000);
