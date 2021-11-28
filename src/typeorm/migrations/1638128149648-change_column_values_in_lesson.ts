import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnValuesInLesson1638128149648 implements MigrationInterface {
    name = 'changeColumnValuesInLesson1638128149648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "date" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "duration"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "duration" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "duration"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "duration" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "date" date NOT NULL
        `);
    }

}
