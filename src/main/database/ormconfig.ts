import "dotenv/config";
import { DataSourceOptions } from "typeorm";

let config: DataSourceOptions;

if (process.env.NODE_ENV === "test") {
  config = {
    type: "sqlite",
    database: "./test.sqlite",
    synchronize: false,
    logging: false,
    entities: ["src/app/shared/database/entities/*"],
    migrations: ["src/app/shared/database/migrations/*"],
  };
} else {
  const rootDir = process.env.NODE_ENV === "production" ? "dist" : "src";

  config = {
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
}

export default config;
