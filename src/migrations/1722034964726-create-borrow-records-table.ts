import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { BorrowRecord } from "../entities/BorrowRecord";

export class CreateBorrowRecordsTable1722034964726 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: BorrowRecord.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'userId',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'bookId',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'borrowedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'returnedAt',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'rating',
          type: 'float',
          isNullable: true,
        },
      ],
    }));

    await queryRunner.createForeignKey(BorrowRecord.tableName, new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));

    await queryRunner.createForeignKey(BorrowRecord.tableName, new TableForeignKey({
      columnNames: ['bookId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'books',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(BorrowRecord.tableName, true, true, true);
  }

}
