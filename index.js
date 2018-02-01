const express = require("express");
const app = express();
require("./api/routes")(app);
app.listen(3000, () => console.log("Example app listening on port 3000!"));
