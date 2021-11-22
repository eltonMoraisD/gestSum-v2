import {MigrationInterface, QueryRunner} from "typeorm";

export class addDeleteCascadePropriety1637541524513 implements MigrationInterface {
    name = 'addDeleteCascadePropriety1637541524513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline" DROP CONSTRAINT "FK_370c108d4290a37dbcdbc7ab53d"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."discipline"
            ADD CONSTRAINT "UQ_139512aefbb11a5b2fa92696828" UNIQUE ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline"
            ADD CONSTRAINT "FK_370c108d4290a37dbcdbc7ab53d" FOREIGN KEY ("disciplinesId") REFERENCES "discipline"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline" DROP CONSTRAINT "FK_370c108d4290a37dbcdbc7ab53d"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."discipline" DROP CONSTRAINT "UQ_139512aefbb11a5b2fa92696828"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline"
            ADD CONSTRAINT "FK_370c108d4290a37dbcdbc7ab53d" FOREIGN KEY ("disciplinesId") REFERENCES "discipline"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
