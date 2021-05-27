// Libraries
import express from "express";

// Middleware
import {
  create as createValidator,
  update as updateValidator,
} from "../middleware/validator/users.validator";

// Controller
import {
  get,
  detail,
  post,
  patch,
  _delete,
} from "../controller/users.controller";

// Serialization
import { generic as genericSerializer } from "../middleware/serializer/users.serizalizer";

const Router = express.Router();

Router.get("/", get, genericSerializer);
Router.get("/:id", detail, genericSerializer);
Router.post("/", createValidator, post, genericSerializer);
Router.patch("/:id", updateValidator, patch);
Router.delete("/:id", _delete);

export default Router;
