const express_app = require("./service").get_service();
const logic = require.main.require("./logic/handle_routes");

/**
 * Activate Express API
 * @param {Express object} express_app
 */
const activate_express_app = function(express_app) {
  express_app.get("/", function(req, res) {
    logic.hello_world({ req, res });
  });
};

module.exports = {
  activate: activate_express_app
};
