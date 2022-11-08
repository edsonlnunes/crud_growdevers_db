import { Growdever } from "../models/growdever";
import { Pool } from "pg";

// const pool = new Pool({
//     host: 'dpg-cdbjgs4gqg47k7r9bls0-a.oregon-postgres.render.com',
//     database: 'teste_uil8',
//     password: 'bIPv6WqLbLd374Tfjk5WBgBj9UcRwcc8',
//     user: 'teste_uil8_user'
// })

const pool = new Pool({
  connectionString:
    "postgres://teste_uil8_user:bIPv6WqLbLd374Tfjk5WBgBj9UcRwcc8@dpg-cdbjgs4gqg47k7r9bls0-a.oregon-postgres.render.com/teste_uil8",
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
