import { Express } from "express";
import growdeversRouter from "../../app/features/growdevers/growdevers.routes";

export default (app: Express) => {
  app.get("/", (request, response) => response.send("ESTÁ FUNCIONANDO"));

  app.use(growdeversRouter());
};
