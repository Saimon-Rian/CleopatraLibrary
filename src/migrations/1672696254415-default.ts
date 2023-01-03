import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672696254415 implements MigrationInterface {
    name = 'default1672696254415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "book"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "file"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "book_id" integer`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_c8d071ffaabce995984f4f94f4b" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_c8d071ffaabce995984f4f94f4b"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "book_id"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "file" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "book" integer NOT NULL`);
    }

}
