import { GrowdeverRepository } from "../repositories/growdever.repository";

interface RequestData {
  id: string;
  name: string;
  birth: Date;
  status: string;
  address?: {
    street: string;
    city: string;
    uf: string;
  };
}

export class UpdateGrowdever {
  private _growdeverRepository: GrowdeverRepository;

  // injecao de dependencia
  constructor(growdeverRepository: GrowdeverRepository) {
    this._growdeverRepository = growdeverRepository;
  }

  async execute(data: RequestData) {
    const growdever = await this._growdeverRepository.findByIDGrowdever(
      data.id
    );

    if (!growdever) {
      throw new Error("Growdever não encontrado");
    }

    growdever.updateInformation(
      data.name,
      data.birth,
      data.status,
      data.address
    );
    await this._growdeverRepository.updateGrowdever(growdever);

    return growdever.toJson();
  }
}
