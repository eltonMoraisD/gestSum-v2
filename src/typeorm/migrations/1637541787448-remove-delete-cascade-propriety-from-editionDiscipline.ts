import {MigrationInterface, QueryRunner} from "typeorm";

export class removeDeleteCascadeProprietyFromEditionDiscipline1637541787448 implements MigrationInterface {
    name = 'removeDeleteCascadeProprietyFromEditionDiscipline1637541787448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."edition_discipline" DROP CONSTRAINT "FK_370c108d4290a37dbcdbc7ab53d"
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
            ALTER TABLE "public"."edition_discipline"
            ADD CONSTRAINT "FK_370c108d4290a37dbcdbc7ab53d" FOREIGN KEY ("disciplinesId") REFERENCES "discipline"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
