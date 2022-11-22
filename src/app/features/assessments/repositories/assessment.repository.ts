import { Assessment } from "../../../models/assessment";
import { AssessmentEntity } from "../../../shared/database/entities/assessment.entity";
import { pgHelper } from "../../../shared/database/pg-helper";

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
