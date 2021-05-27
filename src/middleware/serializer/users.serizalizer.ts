import Users from "../../model/users.model";

type UserRequest = { user: Users; users: Users[]; status: number };

export function generic(req: any, res: any, next: any) {
  const { user = null, users = [], status = 200 }: UserRequest = req;

  // The controller is only returning user || users never both
  // if we see user here, consider that good enough- serialize and return
  const response = user ? serialize(user) : users.map(serialize);

  res.status(status).send(response);
}

function serialize(user: Users) {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt,
  };
}
