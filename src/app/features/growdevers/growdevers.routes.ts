import { Router } from "express";
import { GrowdeverSkillController } from "./controllers/growdever-skill.controller";
import { GrowdeverController } from "./controllers/growdever.controller";
import { ClearFormattingValidator } from "./validators/clear-formatting.validator";
import { ValidateCpfValidator } from "./validators/validate-cpf.validator";
import { VerifyCpfExistsValidator } from "./validators/verify-cpf-exists.validator";

export default () => {
  const growdeverController = new GrowdeverController();
  const growdeverSkillController = new GrowdeverSkillController();

  const router = Router();

  router.get("/growdevers", growdeverController.getAll);
  router.post(
    "/growdevers",
    new ClearFormattingValidator().clearFomatting,
    new ValidateCpfValidator().validateCpf,
    new VerifyCpfExistsValidator().verifyCpfExists,
    growdeverController.create
  );
  router.get("/growdevers/:id", growdeverController.getById);
  router.delete("/growdevers/:id", growdeverController.remove);
  router.put("/growdevers/:id", growdeverController.update);

  //   router.put("/growdevers/:id/skills", growdeverSkillController.addSkills);
  //   router.delete("/growdevers/:id/skills", growdeverSkillController.deleteSkill);

  return router;
};
