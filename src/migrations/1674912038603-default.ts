import { MigrationInterface, QueryRunner } from "typeorm";

export class default1674912038603 implements MigrationInterface {
    name = 'default1674912038603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_3d069c0adcc1dd1a13a2d10c842"`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "writer_id" TO "writer"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "writer"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "writer" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "writer"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "writer" integer`);
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "writer" TO "writer_id"`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_3d069c0adcc1dd1a13a2d10c842" FOREIGN KEY ("writer_id") REFERENCES "writers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
