import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateTableAssessments1669072129808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "assessments",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, isNullable: false },
          {
            name: "grade",
            type: "numeric",
            precision: 4,
            scale: 2,
            isNullable: false,
          },
          {
            name: "subject",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "growdever_id",
            type: "uuid",
            isNullable: false,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "fk_assessments_growdevers",
            columnNames: ["growdever_id"],
            referencedTableName: "growdevers",
            referencedColumnNames: ["id"],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("assessments", true, true, true);
  }
}
