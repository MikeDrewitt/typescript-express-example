import { validationResult } from "express-validator";

// Models
import Users from "../model/users.model";

import { NotFound } from "../constant/api.error";

export async function get(req: any, res: any, next: any) {
  try {
    req.users = await Users.list();

    next();
  } catch (err) {
    next(err);
  }
}

export async function detail(req: any, res: any, next: any) {
  try {
    const { id } = req.params;
    const user = await Users.retrieve(id);

    if (!user) return res.status(404).json(NotFound);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export async function post(req: any, res: any, next: any) {
  try {
    const { username, name, email } = req.body;
    const user = new Users(username, name, email);
    const dbUser = await user.create();

    res.status(201).send(dbUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err });
  }
}

export async function patch(req: any, res: any, next: any) {
  try {
    const { body } = req;
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const user = await Users.retrieve(id);

    if (!user) res.status(404).send();

    await user.update(body);

    res.status(200).send();
  } catch (err) {
    next(err);
  }
}

export async function _delete(req: any, res: any, next: any) {
  try {
    const { id }: { id: number } = req.params;
    const dbResponse = await Users.delete(id);

    if (!dbResponse.affected) return res.status(404).json(NotFound);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
