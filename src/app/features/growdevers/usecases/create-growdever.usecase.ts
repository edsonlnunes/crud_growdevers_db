import { Address } from "../../../models/address";
import { Growdever } from "../../../models/growdever";
import { GrowdeverRepository } from "../repositories/growdever.repository";

interface RequestData {
  name: string;
  cpf: string;
  birth: Date;
  skills: string[];
  address?: {
    street: string;
    city: string;
    uf: string;
  };
}

export class CreateGrowdever {
  private _growdeverRepository: GrowdeverRepository;

  // injecao de dependencia
  constructor(growdeverRepository: GrowdeverRepository) {
    this._growdeverRepository = growdeverRepository;
  }

  async execute(data: RequestData) {
    const growdever = new Growdever(
      data.name,
      data.birth,
      data.cpf,
      data.skills
    );

    if (data.address) {
      const address = new Address(
        data.address.street,
        data.address.city,
        data.address.uf
      );
      growdever.addAddress(address);
    }

    await this._growdeverRepository.saveGrowdever(growdever);

    // limpa o cache
    // await redisHelper.client.del("growdevers");

    return growdever.toJson();
  }
}
