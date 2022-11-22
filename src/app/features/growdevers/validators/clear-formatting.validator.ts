import { Request, Response, NextFunction } from "express";
import "../../../shared/utils/extension-methods";

export class ClearFormattingValidator {
  clearFomatting(request: Request, response: Response, next: NextFunction) {
    const cpf = request.body.cpf as string;

    const onlyCpf = cpf.replace(/\W/g, "");

    request.body.cpf = onlyCpf;

    next();
  }
}
