require("dotenv").config();
import "reflect-metadata";
var bodyParser = require("body-parser");
import { createConnection } from "typeorm";
const express = require("express");
const cors = require("cors");
const route = require("./api/route");

createConnection()
  .then(async connection => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    route(app);

    app.listen(process.env.API_PORT, () => {
      console.log(`Server is listening on port: ${process.env.API_PORT}`);
    });
  })
  .catch(error => console.log(error));
