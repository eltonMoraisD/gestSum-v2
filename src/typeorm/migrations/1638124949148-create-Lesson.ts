import {MigrationInterface, QueryRunner} from "typeorm";

export class createLesson1638124949148 implements MigrationInterface {
    name = 'createLesson1638124949148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "lesson" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "number" integer NOT NULL,
                "weekDay" character varying NOT NULL,
                "date" character varying NOT NULL,
                "local" character varying NOT NULL,
                "duration" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_0ef25918f0237e68696dee455bd" UNIQUE ("id"),
                CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline"
            ADD "lessonId" uuid
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
            ALTER TABLE "public"."edition_discipline" DROP COLUMN "lessonId"
        `);
        await queryRunner.query(`
            DROP TABLE "lesson"
        `);
    }

}
