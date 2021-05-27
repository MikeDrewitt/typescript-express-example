import { ConnectionOptions } from "typeorm";

import environment from "./environment";

const typeORMConfiguration: ConnectionOptions = {
  type: "postgres",
  host: environment.dbHost,
  username: environment.dbUsername,
  password: environment.dbPassword,
  database: environment.database,
  port: 5432,
  synchronize: false,
  logging: false,
  entities: ["src/model/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/model",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export default typeORMConfiguration;
