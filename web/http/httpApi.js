/**
 * @file HTTP Express App - External API
 */

const path = require('path');
const express = require('express');
const express_app = require('./httpService');

/**
 * Activate Express API
 */
const activate_express_app = () => {
  express_app.use(express.static(path.join(__dirname, '/public')));
};

module.exports = {
  activate: activate_express_app,
};
