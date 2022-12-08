import { Request, Response } from "express";
import { Address } from "../../../models/address";
import { Growdever } from "../../../models/growdever";
import { redisHelper } from "../../../shared/database/redis-helper";
import { GrowdeverRepository } from "../repositories/growdever.repository";

export class GrowdeverController {
  async getById(request: Request, response: Response) {
    const { id } = request.params;

    let resultCache = await redisHelper.client.get(`growdever:${id}`);

    if (resultCache) {
      const growdeverCache = JSON.parse(resultCache);
      const growdever = Growdever.create(
        growdeverCache._id,
        growdeverCache._name,
        growdeverCache._cpf,
        new Date(growdeverCache._birth),
        growdeverCache._status,
        growdeverCache._skills,
        Address.create(
          growdeverCache._address._id,
          growdeverCache._address._street,
          growdeverCache._address._city,
          growdeverCache._address._uf
        ),
        growdeverCache._assessments
      );

      return response.status(200).json(growdever.toJson());
    }

    const repository = new GrowdeverRepository();
    const growdever = await repository.findByIDGrowdever(id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    await redisHelper.client.setex(
      `growdever:${growdever.id}`,
      60 * 60,
      JSON.stringify(growdever)
    );

    return response.status(200).json(growdever.toJson());
  }

  async getAll(request: Request, response: Response) {
    const { name, status } = request.query;

    let growdevers: Growdever[] = [];

    const resultCache = await redisHelper.client.get("growdevers");

    if (resultCache) {
      const growdeversCache = JSON.parse(resultCache);

      growdevers = (growdeversCache as any[]).map((cache) =>
        Growdever.create(
          cache._id,
          cache._name,
          cache._cpf,
          new Date(cache._birth),
          cache._status,
          cache._skills,
          undefined,
          cache._assessments
        )
      );
    }

    if (growdevers.length === 0) {
      const repository = new GrowdeverRepository();
      growdevers = await repository.findGrowdevers();
      await redisHelper.client.set("growdevers", JSON.stringify(growdevers));
    }

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

    // limpa o cache
    await redisHelper.client.del("growdevers");

    return response.json(growdever.toJson());
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const repository = new GrowdeverRepository();

    try {
      await repository.removeGrowdev(id);
      await redisHelper.client.del(`growdever:${id}`);
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
      await redisHelper.client.del(`growdever:${id}`);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.json(growdever.toJson());
  }
}
