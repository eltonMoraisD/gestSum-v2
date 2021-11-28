import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnIsvalidate1638134867581 implements MigrationInterface {
    name = 'addColumnIsvalidate1638134867581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."summary"
            ADD "isValidate" boolean NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson" DROP CONSTRAINT "FK_290d52a86e20d9e7e05efb3e5f9"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."summary"
            ADD CONSTRAINT "UQ_406f24bdfa7fbb014243f5f8571" UNIQUE ("id")
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
            ALTER TABLE "public"."summary" DROP CONSTRAINT "UQ_406f24bdfa7fbb014243f5f8571"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."lesson"
            ADD CONSTRAINT "FK_290d52a86e20d9e7e05efb3e5f9" FOREIGN KEY ("summaryId") REFERENCES "summary"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."summary" DROP COLUMN "isValidate"
        `);
    }

}
