import {MigrationInterface, QueryRunner} from "typeorm";

export class PriceStupidNumberNotFloat1615618232911 implements MigrationInterface {
    name = 'PriceStupidNumberNotFloat1615618232911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD "price" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD "price" integer NOT NULL`);
    }

}
