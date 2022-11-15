import { Growdever } from "../models/growdever";
import { GrowdeverEntity } from "../database/entities/growdever.entity";
import { pgHelper } from "../database/pg-helper";

// DATA MAPPER
export class GrowdeverRepository {
  async verifyGrowdeverExistsByCpf(cpf: string): Promise<boolean> {
    const manager = pgHelper.client.manager;
    const growdeverEntity = await manager.findOneBy(GrowdeverEntity, { cpf });
    return !!growdeverEntity;
  }

  async saveGrowdever(growdever: Growdever): Promise<void> {
    const manager = pgHelper.client.manager;

    const growdeverEntity = manager.create(GrowdeverEntity, {
      id: growdever.id,
      name: growdever.name,
      birth: growdever.birth,
      cpf: growdever.cpf,
      status: growdever.status,
      skills: growdever.skills.join(),
    });

    await manager.save(growdeverEntity);
  }

  async findGrowdevers(): Promise<Growdever[]> {
    const manager = pgHelper.client.manager;

    const growdeversEntities = await manager.find(GrowdeverEntity);

    return growdeversEntities.map((row) => {
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
    const manager = pgHelper.client.manager;
    // const growdeverEntity = await manager.findOne(GrowdeverEntity, {
    //   where: { id },
    // });

    const growdeverEntity = await manager.findOneBy(GrowdeverEntity, { id });

    if (!growdeverEntity) return undefined;

    const growdever = Growdever.create(
      growdeverEntity.id,
      growdeverEntity.name,
      growdeverEntity.cpf,
      growdeverEntity.birth,
      growdeverEntity.status,
      growdeverEntity.skills
        ? (growdeverEntity.skills as string).split(",")
        : []
    );

    return growdever;
  }

  async removeGrowdev(id: string): Promise<void> {
    const manager = pgHelper.client.manager;

    const growdeverEntity = await manager.findOneBy(GrowdeverEntity, { id });

    if (!growdeverEntity) throw Error("Growdever não encontrado");

    // await manager.remove(growdeverEntity);
    await manager.delete(GrowdeverEntity, { id });
  }
}

// ACTIVE RECORD
// export class GrowdeverRepository {
//   async verifyGrowdeverExistsByCpf(cpf: string): Promise<boolean> {
//     const growdeverEntity = await GrowdeverEntity.findOneBy({ cpf });
//     return !!growdeverEntity;
//   }

//   async saveGrowdever(growdever: Growdever): Promise<void> {
//     const growdeverEntity = GrowdeverEntity.create({
//       id: growdever.id,
//       name: growdever.name,
//       birth: growdever.birth,
//       cpf: growdever.cpf,
//       status: growdever.status,
//       skills: growdever.skills.join(),
//     });

//     await growdeverEntity.save();
//   }

//   async findGrowdevers(): Promise<Growdever[]> {
//     const growdeversEntities = await GrowdeverEntity.find();

//     return growdeversEntities.map((row) => {
//       const skills = row.skills ? (row.skills as string).split(",") : [];
//       return Growdever.create(
//         row.id,
//         row.name,
//         row.cpf,
//         row.birth,
//         row.status,
//         skills
//       );
//     });
//   }

//   async findByIDGrowdever(id: string): Promise<Growdever | undefined> {
//     // const growdeverEntity = await GrowdeverEntity.findOne({
//     //   where: { id },
//     // });

//     const growdeverEntity = await GrowdeverEntity.findOneBy({ id });

//     if (!growdeverEntity) return undefined;

//     const growdever = Growdever.create(
//       growdeverEntity.id,
//       growdeverEntity.name,
//       growdeverEntity.cpf,
//       growdeverEntity.birth,
//       growdeverEntity.status,
//       growdeverEntity.skills
//         ? (growdeverEntity.skills as string).split(",")
//         : []
//     );

//     return growdever;
//   }

//   async removeGrowdev(id: string): Promise<void> {
//     const growdeverEntity = await GrowdeverEntity.findOneBy({ id });

//     if (!growdeverEntity) throw Error("Growdever não encontrado");

//     await growdeverEntity.remove();
//   }
// }
