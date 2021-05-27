import { check, validationResult } from "express-validator";

export const create = [
  check("username").isString().trim(),
  check("name").isString().trim(),
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];

export const update = [
  check("username").isString().trim().optional({ nullable: true }),
];
