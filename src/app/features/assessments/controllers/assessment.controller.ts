import { Request, Response } from "express";
import { AssessmentRepository } from "../repositories/assessment.repository";

export class AssessmentController {
  async findAllAssessmentsByGrowdever(request: Request, response: Response) {
    const { growdeverId } = request.params;

    const repository = new AssessmentRepository();

    const assessments = await repository.getAssessmentsByGrowdever(growdeverId);

    return response.status(200).json(assessments.map((a) => a.toJson()));
  }
}
