import { Sequelize } from "sequelize";
import { env } from "process";

const sequelize = new Sequelize(
  env.DB_NAME!.toString(),
  env.DB_USER!.toString(),
  env.DB_PASSWORD!.toString(),
  {
    port: parseInt(env.DB_PORT!),
    host: env.DB_HOST!.toString(),
    logging: false,
    dialect: "mysql",
  }
);

export default sequelize;
