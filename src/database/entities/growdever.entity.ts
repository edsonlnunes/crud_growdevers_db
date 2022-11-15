import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "growdevers" })
// export class GrowdeverEntity extends BaseEntity { // active record
export class GrowdeverEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  birth!: Date;

  @Column()
  cpf!: string;

  @Column()
  status!: string;

  @Column()
  skills!: string;
}
