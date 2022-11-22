import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "addresses" })
export class AddressEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  street!: string;

  @Column()
  city!: string;

  @Column()
  uf!: string;

  @Column({ name: "created_at" })
  createdAt!: Date;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @BeforeUpdate()
  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }

  //   @BeforeInsert()
  //   setCreatedAndUpdatedAt() {
  //     this.createdAt = new Date();
  //     this.updatedAt = new Date();
  //   }
}
