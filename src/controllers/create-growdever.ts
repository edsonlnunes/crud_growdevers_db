import { Request, Response } from "express";
import { Growdever } from "../models/growdever";
import { GrowdeverRepository } from "../repositories/growdever";

export class CreateGrowdeverController {
  async create(request: Request, response: Response) {
    const { name, cpf, birth, skills } = request.body;

    if (skills && !(skills instanceof Array)) {
      return response.status(400).json({ error: "Skills no formado inválido" });
    }

    const growdever = new Growdever(name, birth, cpf, skills);

    const repository = new GrowdeverRepository();

    await repository.saveGrowdever(growdever);

    return response.json(growdever.toJson());
  }
}
