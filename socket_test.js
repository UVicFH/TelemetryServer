// force better logging
process.on('unhandledRejection', r => console.log(r));

// create global for module path resolution
global.__base = __dirname;

require('./web/http').service;
require('./web/http').api.activate();

require('./web/socket').service;
require('./web/socket').api.activate();

const socket_actions = require('./web/socket').actions;

let val = 0;
let countUp = true;
setInterval(() => {
  socket_actions.send_data({
    test: {
      id: 300,
      time: Date.now(),
      val
    }
  });

  if (val === 20) countUp = false;
  else if (val === 0) countUp = true;

  if (countUp) val++;
  else val--;
}, 200);
