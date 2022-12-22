import { Growdever } from "../../../models/growdever";
import { GrowdeverRepository } from "../repositories/growdever.repository";

export class GetGrowdeverById {
  private _growdeverRepository: GrowdeverRepository;

  constructor(growdeverRepository: GrowdeverRepository) {
    this._growdeverRepository = growdeverRepository;
  }

  async execute(id: string): Promise<Growdever | undefined> {
    const growdever = await this._growdeverRepository.findByIDGrowdever(id);

    if (!growdever) {
      return undefined;
    }

    return growdever;
  }
}
