import {MigrationInterface, QueryRunner} from "typeorm";

export class removeColumnSummaryIdFromLesson1638138508566 implements MigrationInterface {
    name = 'removeColumnSummaryIdFromLesson1638138508566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP CONSTRAINT "FK_290d52a86e20d9e7e05efb3e5f9"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP CONSTRAINT "UQ_290d52a86e20d9e7e05efb3e5f9"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP COLUMN "summaryId"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD "summaryId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD CONSTRAINT "UQ_290d52a86e20d9e7e05efb3e5f9" UNIQUE ("summaryId")
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD CONSTRAINT "FK_290d52a86e20d9e7e05efb3e5f9" FOREIGN KEY ("summaryId") REFERENCES "summary"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
