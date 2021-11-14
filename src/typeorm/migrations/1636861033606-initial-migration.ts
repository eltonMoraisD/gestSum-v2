import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1636861033606 implements MigrationInterface {
    name = 'initialMigration1636861033606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "teacher_profile" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "sigla" character varying NOT NULL,
                "name" character varying NOT NULL,
                "ocupation" character varying NOT NULL,
                "degree" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_c1503c06e087bf013daf42f1719" UNIQUE ("id"),
                CONSTRAINT "PK_c1503c06e087bf013daf42f1719" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."user"
            ADD "teacherProfileId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."user"
            ADD CONSTRAINT "UQ_3a90e0524b44aea3a06cd4b388a" UNIQUE ("teacherProfileId")
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."user"
            ADD CONSTRAINT "FK_3a90e0524b44aea3a06cd4b388a" FOREIGN KEY ("teacherProfileId") REFERENCES "teacher_profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."user" DROP CONSTRAINT "FK_3a90e0524b44aea3a06cd4b388a"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."user" DROP CONSTRAINT "UQ_3a90e0524b44aea3a06cd4b388a"
        `);
        await queryRunner.query(`
            ALTER TABLE "public"."user" DROP COLUMN "teacherProfileId"
        `);
        await queryRunner.query(`
            DROP TABLE "teacher_profile"
        `);
    }

}
