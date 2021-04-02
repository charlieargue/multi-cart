import {MigrationInterface, QueryRunner} from "typeorm";

export class CartLineAccountsCascadeDelete1617329988252 implements MigrationInterface {
    name = 'CartLineAccountsCascadeDelete1617329988252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_46c6eac877c331217bd00a5f581"`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_46c6eac877c331217bd00a5f581" FOREIGN KEY ("cartLineId") REFERENCES "cart_line"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_46c6eac877c331217bd00a5f581"`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_46c6eac877c331217bd00a5f581" FOREIGN KEY ("cartLineId") REFERENCES "cart_line"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
