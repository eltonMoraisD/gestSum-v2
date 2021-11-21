import {MigrationInterface, QueryRunner} from "typeorm";

export class createEdicaoDisciplinaTable1637459233270 implements MigrationInterface {
    name = 'createEdicaoDisciplinaTable1637459233270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "edition_discipline" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "numEdi" character varying NOT NULL,
                "estado" character varying NOT NULL,
                "anoLetivo" character varying NOT NULL,
                "semestre" character varying NOT NULL,
                "teacherId" uuid,
                CONSTRAINT "UQ_30027d2e4f6901eb5b7495c8100" UNIQUE ("id"),
                CONSTRAINT "PK_30027d2e4f6901eb5b7495c8100" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "edition_discipline"
            ADD CONSTRAINT "FK_cc3db9994db9c165a0effab6d20" FOREIGN KEY ("teacherId") REFERENCES "teacher_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "edition_discipline" DROP CONSTRAINT "FK_cc3db9994db9c165a0effab6d20"
        `);
        await queryRunner.query(`
            DROP TABLE "edition_discipline"
        `);
    }

}
