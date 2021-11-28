import {MigrationInterface, QueryRunner} from "typeorm";

export class updateColumnDateAndDurationInLessonEntity1638127812532 implements MigrationInterface {
    name = 'updateColumnDateAndDurationInLessonEntity1638127812532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline" DROP CONSTRAINT "FK_2bbf9e6e9bbdd676f1b6e95c3ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD CONSTRAINT "UQ_0ef25918f0237e68696dee455bd" UNIQUE ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "date" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "duration"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "duration" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline"
            ADD CONSTRAINT "FK_2bbf9e6e9bbdd676f1b6e95c3ce" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline" DROP CONSTRAINT "FK_2bbf9e6e9bbdd676f1b6e95c3ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "duration"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "duration" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "date" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP CONSTRAINT "UQ_0ef25918f0237e68696dee455bd"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline"
            ADD CONSTRAINT "FK_2bbf9e6e9bbdd676f1b6e95c3ce" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
