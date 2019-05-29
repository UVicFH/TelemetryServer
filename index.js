// force better logging
process.on('unhandledRejection', r => console.log(r));

const config = require('./config.json');

/** The following commands are to initialize the service & activate their api */
const main = async () => {
  if (config.mongo_enabled !== false) {
    await require('./storage').service.open_connection();
  }

  require('./web/http').service;
  require('./web/http').api.activate();

  require('./web/socket').service;
  require('./web/socket').api.activate();

  require('./mqtt').service;
  require('./mqtt').api.activate();
};

main();
