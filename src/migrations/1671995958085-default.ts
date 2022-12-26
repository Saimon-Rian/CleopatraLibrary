import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671995958085 implements MigrationInterface {
    name = 'default1671995958085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book_comment" ("book_id" integer NOT NULL, "comment_id" integer NOT NULL, CONSTRAINT "PK_a5b50b32ff91a2e11a56b4f677a" PRIMARY KEY ("book_id", "comment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3e715a1b89cb2052a0cc48bce1" ON "book_comment" ("book_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_00f894da71b247faea21ab2e84" ON "book_comment" ("comment_id") `);
        await queryRunner.query(`ALTER TABLE "book_comment" ADD CONSTRAINT "FK_3e715a1b89cb2052a0cc48bce13" FOREIGN KEY ("book_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_comment" ADD CONSTRAINT "FK_00f894da71b247faea21ab2e84b" FOREIGN KEY ("comment_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_comment" DROP CONSTRAINT "FK_00f894da71b247faea21ab2e84b"`);
        await queryRunner.query(`ALTER TABLE "book_comment" DROP CONSTRAINT "FK_3e715a1b89cb2052a0cc48bce13"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_00f894da71b247faea21ab2e84"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3e715a1b89cb2052a0cc48bce1"`);
        await queryRunner.query(`DROP TABLE "book_comment"`);
    }

}
