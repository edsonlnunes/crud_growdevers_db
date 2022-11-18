import { Express } from "express";
import { AssessmentController } from "./controllers/assessment.controller";
import { GrowdeverSkillController } from "./controllers/growdever-skill.controller";
import { GrowdeverController } from "./controllers/growdever.controller";

import { ClearFormattingMiddleware } from "./middlewares/clear-formatting.middleware";
import { ValidateCpfMiddleware } from "./middlewares/validate-cpf.middleware";
import { VerifyCpfExistsMiddleware } from "./middlewares/verify-cpf-exists.middleware";

export default (app: Express) => {
  app.get("/", (request, response) => response.send("ESTÁ FUNCIONANDO"));

  const growdeverController = new GrowdeverController();
  const growdeverSkillController = new GrowdeverSkillController();
  const assessmentController = new AssessmentController();

  app.get("/growdevers", growdeverController.getAll);
  app.post(
    "/growdevers",
    new ClearFormattingMiddleware().clearFomatting,
    new ValidateCpfMiddleware().validateCpf,
    new VerifyCpfExistsMiddleware().verifyCpfExists,
    growdeverController.create
  );
  app.get("/growdevers/:id", growdeverController.getById);
  app.delete("/growdevers/:id", growdeverController.remove);
  app.put("/growdevers/:id", growdeverController.update);

  app.put("/growdevers/:id/skills", growdeverSkillController.addSkills);
  app.delete("/growdevers/:id/skills", growdeverSkillController.deleteSkill);

  app.get(
    "/growdevers/:growdeverId/assessments",
    assessmentController.findAllAssessmentsByGrowdever
  );
};

// M = MODELS
// V = VIEWS
// C = CONTROLLERS
