import { Growdever } from "../models/growdever";
import { myPG } from "../db";

export class GrowdeverRepository {
  async saveGrowdever(growdever: Growdever): Promise<void> {
    const client = await myPG.connect();

    await client.query(
      "INSERT INTO growdevers VALUES($1, $2, $3, $4, $5, $6)",
      [
        growdever.id,
        growdever.name,
        growdever.birth,
        growdever.cpf,
        growdever.status,
        growdever.skills.join(),
      ]
    );

    client.release();
  }

  async findGrowdevers(): Promise<Growdever[]> {
    const client = await myPG.connect();

    const result = await client.query("SELECT * FROM growdevers");

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
  }

  async findByIDGrowdever(id: string): Promise<Growdever | undefined> {
    const client = await myPG.connect();

    const result = await client.query(
      "SELECT * FROM growdevers WHERE id = $1",
      [id]
    );

    client.release();

    if (result.rowCount === 0) return undefined;

    const growdever = Growdever.create(
      result.rows[0].id,
      result.rows[0].name,
      result.rows[0].cpf,
      result.rows[0].birth,
      result.rows[0].status,
      result.rows[0].skills ? (result.rows[0].skills as string).split(",") : []
    );

    return growdever;
  }
}
