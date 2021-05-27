import express from "express";

import status from "./status.router";
import users from "./users.router";

import { NotFound } from "../constant/api.error";

const Router = express.Router();

Router.use("/status", status);
Router.use("/users", users);

Router.use("/", (req: any, res: any, next: any) =>
  res.status(404).send(NotFound)
);

export default Router;
