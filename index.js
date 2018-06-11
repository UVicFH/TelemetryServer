// force better logging
process.on('unhandledRejection', r => console.log(r));

// create global for module path resolution
global.__base = __dirname;

const data_store = require('./storage').service.open_connection();

const http_app = require('./http/httpService');

require('./socket/socketService').init(http_app);
require('./mqtt/mqttService');

require('./socket/socketApi').activate();
require('./mqtt/mqttApi').activate();
