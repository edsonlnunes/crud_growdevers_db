import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { GrowdeverEntity } from "./growdever.entity";

@Entity({ name: "assessments" })
export class AssessmentEntity {
  @PrimaryColumn()
  id!: string;

  @Column({ name: "grade" })
  score!: number;

  @Column()
  subject!: string;

  @Column({ name: "id_growdever" })
  growdeverId!: string;

  @ManyToOne(() => GrowdeverEntity)
  @JoinColumn({ name: "id_growdever", referencedColumnName: "id" })
  growdeverEntity?: GrowdeverEntity;
}
