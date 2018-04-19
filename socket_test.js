// force better logging
process.on("unhandledRejection", r => console.log(r));

require("./express/service").init();
const express_app = require("./express/service").get_service();

require("./socket/service").init(express_app);
require("./socket/api").activate();

const socket_actions = require("./socket/actions");

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
