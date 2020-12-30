import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { USER_TOKENS_TABLE_NAME } from '@modules/users/infra/typeorm/entities/UserToken';
import { USERS_TABLE_NAME } from '@modules/users/infra/typeorm/entities/User';

export default class CreateUserTokens1609350491086
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: USER_TOKENS_TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'token',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'USER_TOKEN_USER',
            referencedTableName: USERS_TABLE_NAME,
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(USER_TOKENS_TABLE_NAME);
  }
}
