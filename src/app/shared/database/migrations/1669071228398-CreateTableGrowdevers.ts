import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableGrowdevers1669071228398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "growdevers",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, isNullable: false },
          { name: "name", type: "varchar", length: "100", isNullable: false },
          { name: "birth", type: "date", isNullable: false },
          {
            name: "cpf",
            type: "varchar",
            length: "11",
            isUnique: true,
            isNullable: false,
          },
          { name: "status", type: "varchar", length: "30", isNullable: false },
          { name: "skills", type: "text", isNullable: true },
          { name: "address_id", type: "uuid", isNullable: true },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "fk_growdevers_addresses",
            columnNames: ["address_id"],
            referencedTableName: "addresses",
            referencedColumnNames: ["id"],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("growdevers", true, true, true);
  }
}
