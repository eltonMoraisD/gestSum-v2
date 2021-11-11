import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigrations1636586289587 implements MigrationInterface {
    name = 'initialMigrations1636586289587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "permissions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_920331560282b8bd21bb02290df" UNIQUE ("id"),
                CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_c216a82ffa1e4c6d0224c349272" UNIQUE ("description"),
                CONSTRAINT "UQ_b36bcfe02fc8de3c57a8b2391c2" UNIQUE ("id"),
                CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "permissions_roles_mapping" (
                "roleId" uuid NOT NULL,
                "permissionId" uuid NOT NULL,
                CONSTRAINT "PK_7b528c492095c19a6d075e53894" PRIMARY KEY ("roleId", "permissionId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8c41e3d0e32cc1b3e8d2f99424" ON "permissions_roles_mapping" ("roleId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_74dac13eea252fb107cd798c6a" ON "permissions_roles_mapping" ("permissionId")
        `);
        await queryRunner.query(`
            CREATE TABLE "users_role_mapping" (
                "userId" uuid NOT NULL,
                "roleId" uuid NOT NULL,
                CONSTRAINT "PK_bb04ad80fbc084a94d943fdf61d" PRIMARY KEY ("userId", "roleId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_adfe9b385fb1aac65c0f0f142a" ON "users_role_mapping" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ed94f165618d00de807f7c190b" ON "users_role_mapping" ("roleId")
        `);
        await queryRunner.query(`
            ALTER TABLE "permissions_roles_mapping"
            ADD CONSTRAINT "FK_8c41e3d0e32cc1b3e8d2f99424d" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "permissions_roles_mapping"
            ADD CONSTRAINT "FK_74dac13eea252fb107cd798c6a0" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users_role_mapping"
            ADD CONSTRAINT "FK_adfe9b385fb1aac65c0f0f142ae" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users_role_mapping"
            ADD CONSTRAINT "FK_ed94f165618d00de807f7c190b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_role_mapping" DROP CONSTRAINT "FK_ed94f165618d00de807f7c190b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_role_mapping" DROP CONSTRAINT "FK_adfe9b385fb1aac65c0f0f142ae"
        `);
        await queryRunner.query(`
            ALTER TABLE "permissions_roles_mapping" DROP CONSTRAINT "FK_74dac13eea252fb107cd798c6a0"
        `);
        await queryRunner.query(`
            ALTER TABLE "permissions_roles_mapping" DROP CONSTRAINT "FK_8c41e3d0e32cc1b3e8d2f99424d"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_ed94f165618d00de807f7c190b"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_adfe9b385fb1aac65c0f0f142a"
        `);
        await queryRunner.query(`
            DROP TABLE "users_role_mapping"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_74dac13eea252fb107cd798c6a"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8c41e3d0e32cc1b3e8d2f99424"
        `);
        await queryRunner.query(`
            DROP TABLE "permissions_roles_mapping"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            DROP TABLE "permissions"
        `);
    }

}
