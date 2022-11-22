import { NextFunction, Request, Response } from "express";
import { GrowdeverRepository } from "../repositories/growdever.repository";
import "../../../shared/utils/extension-methods";

export class VerifyCpfExistsValidator {
  async verifyCpfExists(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { cpf } = request.body;

    const repository = new GrowdeverRepository();

    const growdeverExits = await repository.verifyGrowdeverExistsByCpf(cpf);

    if (growdeverExits) {
      return response.status(400).json({ error: "CPF já cadastrado" });
    }

    return next();
  }
}
