import "dotenv/config";
import { DataSourceOptions } from "typeorm";

const rootDir = process.env.NODE_ENV === "production" ? "dist" : "src";

console.log("ROOT DIR: " + rootDir);
console.log("NODE ENV: " + process.env.NODE_ENV);
const config: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [rootDir + "/app/shared/database/entities/*"],
  migrations: [rootDir + "/app/shared/database/migrations/*"],
};

export default config;
