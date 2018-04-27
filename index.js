// force better logging
process.on('unhandledRejection', r => console.log(r));

const data_store = require('./storage/service').open_connection();

require('./express/service').init();

const express_app = require('./express/service').get_service();

require('./socket/service').init(express_app);
require('./mqtt/service').init();

require('./socket/api').activate();
require('./mqtt/api').activate();
