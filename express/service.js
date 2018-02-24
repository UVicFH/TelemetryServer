const express = require("express");
const routes_api = require("./api");

const init_express = function() {
  console.log("Initializing Express server");
  let app;
  try {
    app = express();
    console.log(
      "Express server initialize successfully! -- waiting on another module to express app to port"
    );
  } catch (error) {
    console.error(`Error server failed to initialize due to: ${error}`);
    throw error;
  }
  routes_api(app);
  return app;
};

module.exports = function() {
  return init_express();
};
