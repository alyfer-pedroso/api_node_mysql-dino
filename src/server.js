const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: ".env" });

const routes = require("./routes");

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use("", routes);

// server.listen(process.env.PORT || 3001, () => {
//   console.log(`Server running on port ${process.env.PORT || 3001}`);
// });
