import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMore1695389766280 implements MigrationInterface {
    name = 'AddMore1695389766280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "price" integer NOT NULL DEFAULT '1', "unit" character varying NOT NULL DEFAULT 'Pieces', "balance" integer NOT NULL DEFAULT '0', "is_archive" boolean NOT NULL DEFAULT false, "pointId" uuid, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consumption_component" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL DEFAULT '1', "componentId" uuid, "forProductId" uuid, CONSTRAINT "PK_6b5a45affba5cf34af007dc4652" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "price" integer NOT NULL DEFAULT '1', "unit" character varying NOT NULL DEFAULT 'Pieces', "sales_unit" integer NOT NULL DEFAULT '1', "is_archive" boolean NOT NULL DEFAULT false, "pointId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "point" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "address" character varying NOT NULL, "tenantId" uuid, CONSTRAINT "PK_391f59a9491a08961038a615371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ed1d2b14c143b2cba50df16ca4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0dce9bc93c2d2c399982d04bef1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "policy_permission" DROP COLUMN "conditions"`);
        await queryRunner.query(`ALTER TABLE "policy_permission" ADD "conditions" jsonb array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_9d911e3759eb85a6dab0ecfab4f" FOREIGN KEY ("pointId") REFERENCES "point"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption_component" ADD CONSTRAINT "FK_ccfd7c2edbd8fef7ec89d70a06b" FOREIGN KEY ("componentId") REFERENCES "component"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consumption_component" ADD CONSTRAINT "FK_2a5b7d1ab84e3fe7247bccf93e7" FOREIGN KEY ("forProductId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_51b4f57c431ef73d929d42c7cdd" FOREIGN KEY ("pointId") REFERENCES "point"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "point" ADD CONSTRAINT "FK_0ed3b09443d24924a025468306f" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "point" DROP CONSTRAINT "FK_0ed3b09443d24924a025468306f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_51b4f57c431ef73d929d42c7cdd"`);
        await queryRunner.query(`ALTER TABLE "consumption_component" DROP CONSTRAINT "FK_2a5b7d1ab84e3fe7247bccf93e7"`);
        await queryRunner.query(`ALTER TABLE "consumption_component" DROP CONSTRAINT "FK_ccfd7c2edbd8fef7ec89d70a06b"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_9d911e3759eb85a6dab0ecfab4f"`);
        await queryRunner.query(`ALTER TABLE "policy_permission" DROP COLUMN "conditions"`);
        await queryRunner.query(`ALTER TABLE "policy_permission" ADD "conditions" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`DROP TABLE "product_category"`);
        await queryRunner.query(`DROP TABLE "component_category"`);
        await queryRunner.query(`DROP TABLE "point"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "consumption_component"`);
        await queryRunner.query(`DROP TABLE "component"`);
    }

}
