const actions = require('./socketActions');
const api = require('./socketApi');
const handler = require('./socketHandler');
const service = require('./socketService');

module.exports = {
  actions,
  api,
  handler,
  service
};
