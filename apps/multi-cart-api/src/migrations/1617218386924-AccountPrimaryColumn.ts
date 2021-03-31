import {MigrationInterface, QueryRunner} from "typeorm";

export class AccountPrimaryColumn1617218386924 implements MigrationInterface {
    name = 'AccountPrimaryColumn1617218386924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "accountNumber"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "accountNumber" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08" PRIMARY KEY ("accountNumber")`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" DROP COLUMN "accountAccountNumber"`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" ADD "accountAccountNumber" character varying(20)`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354" FOREIGN KEY ("accountAccountNumber") REFERENCES "account"("accountNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354"`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" DROP COLUMN "accountAccountNumber"`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" ADD "accountAccountNumber" integer`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08"`);
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "accountNumber"`);
        await queryRunner.query(`ALTER TABLE "account" ADD "accountNumber" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08" PRIMARY KEY ("accountNumber")`);
        await queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354" FOREIGN KEY ("accountAccountNumber") REFERENCES "account"("accountNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
