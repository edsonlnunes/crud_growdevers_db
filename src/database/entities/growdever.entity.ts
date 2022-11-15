import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { AddressEntity } from "./address.entity";

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

  @Column({ name: "address_id" })
  addressId?: string;

  @OneToOne(() => AddressEntity, { eager: true })
  @JoinColumn({ name: "address_id", referencedColumnName: "id" })
  addressEntity?: AddressEntity;
}
