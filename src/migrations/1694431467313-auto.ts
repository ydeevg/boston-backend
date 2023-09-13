import { MigrationInterface, QueryRunner } from "typeorm";

export class auto1694431467313 implements MigrationInterface {
    name = 'auto1694431467313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "brand_name" character varying NOT NULL, "legal_name" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "s_police" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_f7269c1ef88db2975bd72f2a2c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "policy_permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "create" boolean NOT NULL DEFAULT false, "read" boolean NOT NULL DEFAULT false, "update_" boolean NOT NULL DEFAULT false, "delete" boolean NOT NULL DEFAULT false, "execute" boolean NOT NULL DEFAULT false, "policyId" uuid, "user_roleId" uuid, CONSTRAINT "PK_53899199bf52d7cf51b4f389879" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "companyId" uuid, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL DEFAULT '', "name" character varying NOT NULL DEFAULT '', "cashiers_name" character varying NOT NULL DEFAULT '', CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "refresh_token" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "policy_permission" ADD CONSTRAINT "FK_c8b6335da8d361c1a1f12261b4b" FOREIGN KEY ("policyId") REFERENCES "s_police"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "policy_permission" ADD CONSTRAINT "FK_4be4296a8db0f4d140d58903315" FOREIGN KEY ("user_roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_6d29d31feb24503b868472091bc" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_6d29d31feb24503b868472091bc"`);
        await queryRunner.query(`ALTER TABLE "policy_permission" DROP CONSTRAINT "FK_4be4296a8db0f4d140d58903315"`);
        await queryRunner.query(`ALTER TABLE "policy_permission" DROP CONSTRAINT "FK_c8b6335da8d361c1a1f12261b4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "policy_permission"`);
        await queryRunner.query(`DROP TABLE "s_police"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
