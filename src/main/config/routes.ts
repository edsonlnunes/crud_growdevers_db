import { Express } from "express";
import growdeversRouter from "../../app/features/growdevers/growdevers.routes";

export default (app: Express) => {
  app.get("/", (request, response) => response.send("ESTÁ FUNCIONANDO"));

  app.use(growdeversRouter());
};

// const growdeverController = new GrowdeverController();
//   const growdeverSkillController = new GrowdeverSkillController();
//   const assessmentController = new AssessmentController();

//   app.get("/growdevers", growdeverController.getAll);
//   app.post(
//     "/growdevers",
//     new ClearFormattingMiddleware().clearFomatting,
//     new ValidateCpfMiddleware().validateCpf,
//     new VerifyCpfExistsMiddleware().verifyCpfExists,
//     growdeverController.create
//   );
//   app.get("/growdevers/:id", growdeverController.getById);
//   app.delete("/growdevers/:id", growdeverController.remove);
//   app.put("/growdevers/:id", growdeverController.update);

//   app.put("/growdevers/:id/skills", growdeverSkillController.addSkills);
//   app.delete("/growdevers/:id/skills", growdeverSkillController.deleteSkill);

//   app.get(
//     "/growdevers/:growdeverId/assessments",
//     assessmentController.findAllAssessmentsByGrowdever
//   );
