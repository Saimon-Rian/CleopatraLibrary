import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672015017405 implements MigrationInterface {
    name = 'default1672015017405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "author" TO "writer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "writer" TO "author"`);
    }

}
