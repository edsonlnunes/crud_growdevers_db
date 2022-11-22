import { Request, Response } from "express";
import { Growdever } from "../../../models/growdever";
import { GrowdeverRepository } from "../repositories/growdever.repository";

export class GrowdeverController {
  async getById(request: Request, response: Response) {
    const { id } = request.params;

    const repository = new GrowdeverRepository();

    const growdever = await repository.findByIDGrowdever(id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    return response.status(200).json(growdever.toJson());
  }

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

  async create(request: Request, response: Response) {
    const { name, cpf, birth, skills, address } = request.body;

    if (skills && !(skills instanceof Array)) {
      return response.status(400).json({ error: "Skills no formado inválido" });
    }

    const growdever = new Growdever(name, new Date(birth), cpf, skills);

    if (address) {
      growdever.addAddress(address.street, address.city, address.uf);
    }

    const repository = new GrowdeverRepository();

    await repository.saveGrowdever(growdever);

    return response.json(growdever.toJson());
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const repository = new GrowdeverRepository();

    try {
      await repository.removeGrowdev(id);
      return response.status(200).json();
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { name, birth, status, address } = request.body;

    const repository = new GrowdeverRepository();

    const growdever = await repository.findByIDGrowdever(id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    try {
      growdever.updateInformation(name, new Date(birth), status, address);
      await repository.updateGrowdever(growdever);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(growdever.toJson());
  }
}
