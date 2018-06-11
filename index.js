// force better logging
process.on('unhandledRejection', r => console.log(r));

// create global for module path resolution
global.__base = __dirname;

/** The following commands are to initialize the service & activate their api */
const data_store = require('./storage').service.open_connection();

require('./web/http').service;
require('./web/http').api.activate();

require('./web/socket').service;
require('./web/socket').api.activate();

require('./mqtt').service;
require('./mqtt').api.activate();
