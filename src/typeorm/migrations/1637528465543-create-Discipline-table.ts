import {MigrationInterface, QueryRunner} from "typeorm";

export class createDisciplineTable1637528465543 implements MigrationInterface {
    name = 'createDisciplineTable1637528465543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "discipline" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying NOT NULL,
                "name" character varying NOT NULL,
                "sinopse" character varying NOT NULL,
                CONSTRAINT "UQ_139512aefbb11a5b2fa92696828" UNIQUE ("id"),
                CONSTRAINT "PK_139512aefbb11a5b2fa92696828" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline"
            ADD "disciplinesId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline"
            ADD CONSTRAINT "UQ_30027d2e4f6901eb5b7495c8100" UNIQUE ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline"
            ADD CONSTRAINT "FK_370c108d4290a37dbcdbc7ab53d" FOREIGN KEY ("disciplinesId") REFERENCES "discipline"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline" DROP CONSTRAINT "FK_370c108d4290a37dbcdbc7ab53d"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline" DROP CONSTRAINT "UQ_30027d2e4f6901eb5b7495c8100"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline" DROP COLUMN "disciplinesId"
        `);
        await queryRunner.query(`
            DROP TABLE "discipline"
        `);
    }

}
