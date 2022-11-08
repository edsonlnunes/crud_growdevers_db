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
}
