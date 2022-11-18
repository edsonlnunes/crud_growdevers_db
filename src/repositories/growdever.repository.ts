import { Growdever } from "../models/growdever";
import { GrowdeverEntity } from "../database/entities/growdever.entity";
import { pgHelper } from "../database/pg-helper";
import { AddressEntity } from "../database/entities/address.entity";
import { Address } from "../models/address";
import { Assessment } from "../models/assessment";

// DATA MAPPER
export class GrowdeverRepository {
  async verifyGrowdeverExistsByCpf(cpf: string): Promise<boolean> {
    const manager = pgHelper.client.manager;
    const growdeverEntity = await manager.findOneBy(GrowdeverEntity, { cpf });
    return !!growdeverEntity;
  }

  async saveGrowdever(growdever: Growdever): Promise<void> {
    const manager = pgHelper.client.manager;

    if (growdever.address) {
      const addressEntity = manager.create(AddressEntity, {
        id: growdever.address.id,
        street: growdever.address.street,
        city: growdever.address.city,
        uf: growdever.address.uf,
      });

      await manager.save(addressEntity);
    }

    const growdeverEntity = manager.create(GrowdeverEntity, {
      id: growdever.id,
      name: growdever.name,
      birth: growdever.birth,
      cpf: growdever.cpf,
      status: growdever.status,
      skills: growdever.skills.join(),
      addressId: growdever.address ? growdever.address.id : undefined,
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

    // const growdeverEntity = await manager.findOneBy(GrowdeverEntity, { id });

    const growdeverEntity = await manager.findOne(GrowdeverEntity, {
      where: { id },
      // relations: ["assessmentsEntities"],
    });

    if (!growdeverEntity) return undefined;

    const address = growdeverEntity.addressEntity
      ? Address.create(
          growdeverEntity.addressEntity.id,
          growdeverEntity.addressEntity.street,
          growdeverEntity.addressEntity.city,
          growdeverEntity.addressEntity.uf
        )
      : undefined;

    // const assesments = growdeverEntity.assessmentsEntities
    //   ? growdeverEntity.assessmentsEntities.map((entity) =>
    //       Assessment.create(entity.id, entity.score, entity.subject)
    //     )
    //   : undefined;

    const growdever = Growdever.create(
      growdeverEntity.id,
      growdeverEntity.name,
      growdeverEntity.cpf,
      growdeverEntity.birth,
      growdeverEntity.status,
      growdeverEntity.skills
        ? (growdeverEntity.skills as string).split(",")
        : [],
      address
      // assesments
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

  async updateGrowdever(growdever: Growdever): Promise<void> {
    const manager = pgHelper.client.manager;

    const growdeverEntity = await manager.findOne(GrowdeverEntity, {
      where: { id: growdever.id },
    });

    if (!growdeverEntity) throw new Error("Growdever não encontrado");

    // atualiza os dados pessoais do growdever
    await manager.update(
      GrowdeverEntity,
      { id: growdever.id },
      {
        name: growdever.name,
        status: growdever.status,
        birth: growdever.birth,
      }
    );

    // endereco

    // pode ser incluído
    if (!growdeverEntity.addressEntity && growdever.address) {
      const addressEntity = manager.create(AddressEntity, {
        id: growdever.address.id,
        street: growdever.address.street,
        city: growdever.address.city,
        uf: growdever.address.uf,
      });

      await manager.save(addressEntity);

      await manager.update(
        GrowdeverEntity,
        { id: growdeverEntity.id },
        { addressId: addressEntity.id }
      );
    }

    // pode ser removido
    if (growdeverEntity.addressEntity && !growdever.address) {
      await manager.update(
        GrowdeverEntity,
        { id: growdeverEntity.id },
        { addressId: null }
      );
      await manager.delete(AddressEntity, { id: growdeverEntity.addressId });
    }

    // pode ser atualizado
    if (growdeverEntity.addressEntity && growdever.address) {
      await manager.update(
        AddressEntity,
        { id: growdeverEntity.addressId },
        {
          street: growdever.address.street,
          city: growdever.address.city,
          uf: growdever.address.uf,
        }
      );
    }
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
