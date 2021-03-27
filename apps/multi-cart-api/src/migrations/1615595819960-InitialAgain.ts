import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialAgain1615595819960 implements MigrationInterface {
    name = 'InitialAgain1615595819960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_e4ebe82255b564027ae01acd239"`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_e4ebe82255b564027ae01acd239" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_e4ebe82255b564027ae01acd239"`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_e4ebe82255b564027ae01acd239" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
