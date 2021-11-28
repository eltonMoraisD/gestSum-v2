import {MigrationInterface, QueryRunner} from "typeorm";

export class createSummary1638133070779 implements MigrationInterface {
    name = 'createSummary1638133070779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "summary" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "summaryName" character varying NOT NULL,
                "activities" character varying,
                "numStudents" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "lessonId" uuid,
                CONSTRAINT "UQ_406f24bdfa7fbb014243f5f8571" UNIQUE ("id"),
                CONSTRAINT "REL_69526c8e5e198e267db43b25ee" UNIQUE ("lessonId"),
                CONSTRAINT "PK_406f24bdfa7fbb014243f5f8571" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "summaryId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD CONSTRAINT "UQ_290d52a86e20d9e7e05efb3e5f9" UNIQUE ("summaryId")
        `);
        await queryRunner.query(`
            ALTER TABLE "summary"
            ADD CONSTRAINT "FK_69526c8e5e198e267db43b25eee" FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD CONSTRAINT "FK_290d52a86e20d9e7e05efb3e5f9" FOREIGN KEY ("summaryId") REFERENCES "summary"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP CONSTRAINT "FK_290d52a86e20d9e7e05efb3e5f9"
        `);
        await queryRunner.query(`
            ALTER TABLE "summary" DROP CONSTRAINT "FK_69526c8e5e198e267db43b25eee"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP CONSTRAINT "UQ_290d52a86e20d9e7e05efb3e5f9"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "summaryId"
        `);
        await queryRunner.query(`
            DROP TABLE "summary"
        `);
    }

}
