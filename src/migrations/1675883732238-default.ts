import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675883732238 implements MigrationInterface {
    name = 'default1675883732238'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "src" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "src" SET NOT NULL`);
    }

}
