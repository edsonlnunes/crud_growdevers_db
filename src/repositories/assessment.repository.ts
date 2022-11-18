import { AssessmentEntity } from "../database/entities/assessment.entity";
import { pgHelper } from "../database/pg-helper";
import { Assessment } from "../models/assessment";

export class AssessmentRepository {
  async getAssessmentsByGrowdever(growdeverId: string): Promise<Assessment[]> {
    const manager = pgHelper.client.manager;

    const assessmentsEntities = await manager.find(AssessmentEntity, {
      where: { growdeverId },
    });

    return assessmentsEntities.map((e) =>
      Assessment.create(e.id, e.score, e.subject)
    );
  }
}
