const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: ".env" });

const routes = require("./routes");
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use("/api", routes);

server.listen(process.env.PORT, () => {
  console.log(`Server is running in http://localhost:${process.env.PORT}`);
});
