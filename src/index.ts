// Libraries
import "reflect-metadata";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection } from "typeorm";

// Allows alias paths
// New paths need to be added to package.json, tsconfig.json, and jest.config.js
// tsconfig.json - allows linting + general typescript to work
// package.json - allows compiled js to work
// jest.config.js - allows testing imports to work

import environment from "./environment";
import connectionInfo from "./database";

// Middleware
import router from "./router";
import errorHandler from "./middleware/errorHandler.middleware";

const app = express();

createConnection(connectionInfo)
  .then((connection) => {
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(cors());
    app.use(morgan("combined"));

    // Middleware;
    app.use("/", router);
    app.use(errorHandler);

    app.listen(environment.port, () =>
      console.log(`API listenting at port - ${environment.port}`)
    );
  })
  .catch((err) => console.log("TypeORM connection error:", err));
