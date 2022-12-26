import { MigrationInterface, QueryRunner } from "typeorm";

export class default1672014455885 implements MigrationInterface {
    name = 'default1672014455885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_d2211ba79c9312cdcda4d7d5860"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "user" integer NOT NULL, "book" integer NOT NULL, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "writers" ("id" SERIAL NOT NULL, "name" text NOT NULL, "user" integer NOT NULL, "book" integer NOT NULL, CONSTRAINT "PK_9b15ff1c2dff5079a773e982567" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "user" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "books" ADD "comments" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "user" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "book" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "book"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "comments"`);
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "user"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "books" ADD "user_id" integer`);
        await queryRunner.query(`DROP TABLE "writers"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_d2211ba79c9312cdcda4d7d5860" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
