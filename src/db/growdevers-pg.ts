import { Growdever } from "../models/growdever";
import { Pool } from "pg";

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const findAllGrowdevers = async (): Promise<Growdever[]> => {
  const client = await pool.connect();
  const result = await client.query(
    "SELECT * FROM growdevers where id = '29f440b8-8189-409a-a635-99b872be503a'"
  );

  console.log(result);

  client.release();

  return result.rows.map((row) => {
    const skills = row.skills ? (row.skills as string).split(",") : [];
    return Growdever.create(
      row.id,
      row.name,
      row.cpf,
      row.birth,
      row.status,
      skills
    );
  });
};

export const saveGrowdever = async (growdever: Growdever): Promise<void> => {
  const client = await pool.connect();

  //   await client.query(
  //     `INSERT INTO growdevers VALUES ('${growdever.id}', '${growdever.name}', '${
  //       growdever.birth.toISOString().split("T")[0]
  //     }', '${growdever.cpf}', '${
  //       growdever.status
  //     }', '${growdever.skills.join()}')`
  //   );

  await client.query("INSERT INTO growdevers VALUES($1, $2, $3, $4, $5, $6)", [
    growdever.id,
    growdever.name,
    growdever.birth,
    growdever.cpf,
    growdever.status,
    growdever.skills.join(),
  ]);

  client.release();
};

// saveGrowdever(new Growdever("Rafael", "1997-09-26", "55522233322", ["JS"]));

findAllGrowdevers();
