import {MigrationInterface, QueryRunner} from "typeorm";

export class CurrentCart1616026329545 implements MigrationInterface {
    name = 'CurrentCart1616026329545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "currentCartId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."currentCartId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_aff88046a76e55c10156f1a2f84" UNIQUE ("currentCartId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aff88046a76e55c10156f1a2f84" FOREIGN KEY ("currentCartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aff88046a76e55c10156f1a2f84"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_aff88046a76e55c10156f1a2f84"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."currentCartId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "currentCartId" SET NOT NULL`);
    }

}
