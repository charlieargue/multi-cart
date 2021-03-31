import {MigrationInterface, QueryRunner} from "typeorm";

export class CartLineAccounts1617211929390 implements MigrationInterface {
    name = 'CartLineAccounts1617211929390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("accountNumber" SERIAL NOT NULL, "accountName" character varying NOT NULL, "amountRemaining" double precision NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08" PRIMARY KEY ("accountNumber"))`);
        await queryRunner.query(`CREATE TABLE "cart_line_account" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL DEFAULT '0', "accountNumber" character varying NOT NULL, "cartLineId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountAccountNumber" integer, CONSTRAINT "PK_b6e7c1b18d459e6820cbf28acff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354" FOREIGN KEY ("accountAccountNumber") REFERENCES "account"("accountNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_46c6eac877c331217bd00a5f581" FOREIGN KEY ("cartLineId") REFERENCES "cart_line"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_46c6eac877c331217bd00a5f581"`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354"`);
        await queryRunner.query(`DROP TABLE "cart_line_account"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
