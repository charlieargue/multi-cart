import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableIssueCurrentCartid1616029224209 implements MigrationInterface {
    name = 'NullableIssueCurrentCartid1616029224209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aff88046a76e55c10156f1a2f84"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "currentCartId" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."currentCartId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aff88046a76e55c10156f1a2f84" FOREIGN KEY ("currentCartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aff88046a76e55c10156f1a2f84"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."currentCartId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "currentCartId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aff88046a76e55c10156f1a2f84" FOREIGN KEY ("currentCartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
