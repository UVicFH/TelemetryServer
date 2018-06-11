/**
 * @file HTTP Express App - External API
 */

/*
 * This is currently DEAD CODE
 * This may be used as boilderplate in the future to setup
 */
const express_app = require('./httpService');

/**
 * Activate Express API
 * @param {Express object} express_app
 */
const activate_express_app = function(express_app) {
  express_app.get('/', function(req, res) {
    res.send('Hello World!');
  });
};

module.exports = {
  activate: activate_express_app
};
