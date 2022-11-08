import { Request, Response } from "express";
import { GrowdeverRepository } from "../repositories/growdever";

export class GetAllGrowdeversController {
  async getAll(request: Request, response: Response) {
    const { name, status } = request.query;

    const repository = new GrowdeverRepository();
    let growdevers = await repository.findGrowdevers();

    if (name || status) {
      growdevers = growdevers.filter((growdever) => {
        let filterName = true;
        let filterStatus = true;

        if (name) {
          filterName = growdever.name
            .toLowerCase()
            .includes(name.toString().toLowerCase());
        }

        if (status) {
          filterStatus =
            growdever.status.toUpperCase() === status.toString().toUpperCase();
        }

        return filterName && filterStatus;
      });
    }

    return response.json(growdevers.map((g) => g.toJson()));
  }
}
