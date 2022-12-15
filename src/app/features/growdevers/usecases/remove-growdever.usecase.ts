import { GrowdeverRepository } from "../repositories/growdever.repository";

export class RemoveGrowdever {
  private _growdeverRepository: GrowdeverRepository;

  // injecao de dependencia
  constructor(growdeverRepository: GrowdeverRepository) {
    this._growdeverRepository = growdeverRepository;
  }

  async execute(id: string): Promise<void> {
    await this._growdeverRepository.removeGrowdev(id);
  }
}
