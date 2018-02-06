const logic = require.main.require("./logic/handle_routes");

module.exports = function(app) {
  app.get("/", function(req, res) {
    logic.hello_world({ req, res });
  });
};
