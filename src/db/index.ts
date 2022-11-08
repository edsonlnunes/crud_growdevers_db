import { Pool } from "pg";

export const myPG = new Pool({
  connectionString:
    "postgres://teste_uil8_user:bIPv6WqLbLd374Tfjk5WBgBj9UcRwcc8@dpg-cdbjgs4gqg47k7r9bls0-a.oregon-postgres.render.com/teste_uil8",
  ssl: {
    rejectUnauthorized: false,
  },
});
