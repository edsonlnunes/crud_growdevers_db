import { Growdever } from "../models/growdever";
import { myPG } from "../db";
import { pgHelper } from "../database/pg-helper";

export class GrowdeverRepository {
  async saveGrowdever(growdever: Growdever): Promise<void> {
    await pgHelper.client?.query(
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
  }

  async findGrowdevers(): Promise<Growdever[]> {
    const result = await pgHelper.client?.query("SELECT * FROM growdevers");

    return (result as Array<any>).map((row) => {
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
    const result: Array<any> = await pgHelper.client?.query(
      "SELECT * FROM growdevers WHERE id = $1",
      [id]
    );

    if (result.length === 0) return undefined;

    const growdever = Growdever.create(
      result[0].id,
      result[0].name,
      result[0].cpf,
      result[0].birth,
      result[0].status,
      result[0].skills ? (result[0].skills as string).split(",") : []
    );

    return growdever;
  }
}
