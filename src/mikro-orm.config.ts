import { Options } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import { User } from "./entities/user.entity";
import { Migrator } from "@mikro-orm/migrations";
import { ChatHistory } from "./entities/chat-history.entity";

const config: Options = {
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USERNAME,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  entities: [User, ChatHistory],
  debug: true,
  driver: MySqlDriver,
  extensions: [Migrator],
  migrations: {
    tableName: "mikro_orm_migrations",
    path: "./migrations",
    glob: "!(*.d).{js,ts}",
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: "ts",
  },
};

export default config;
