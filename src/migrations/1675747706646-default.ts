import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675747706646 implements MigrationInterface {
    name = 'default1675747706646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "age" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "age" SET NOT NULL`);
    }

}
