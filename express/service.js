const app = require("express")();
require("./api")(app);

module.exports = app;
