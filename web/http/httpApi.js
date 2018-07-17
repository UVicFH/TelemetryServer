/**
 * @file HTTP Express App - External API
 */

const path = require('path');
const express = require('express');
const express_app = require('./httpService');

/**
 * Activate Express API
 */
const activate_express_app = function() {
  express_app.use(express.static(path.join(__dirname, "/public")));
  express_app.listen(3000, '0.0.0.0', function(err) {
    if(err){
       console.log(err);
       } else {
       console.log("listen:3000");
    }
});
};

module.exports = {
  activate: activate_express_app
};
