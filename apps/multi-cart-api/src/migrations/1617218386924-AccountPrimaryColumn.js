"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPrimaryColumn1617218386924 = void 0;
class AccountPrimaryColumn1617218386924 {
    constructor() {
        this.name = 'AccountPrimaryColumn1617218386924';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354"`);
            yield queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08"`);
            yield queryRunner.query(`ALTER TABLE "account" DROP COLUMN "accountNumber"`);
            yield queryRunner.query(`ALTER TABLE "account" ADD "accountNumber" character varying(20) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08" PRIMARY KEY ("accountNumber")`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" DROP COLUMN "accountAccountNumber"`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" ADD "accountAccountNumber" character varying(20)`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354" FOREIGN KEY ("accountAccountNumber") REFERENCES "account"("accountNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354"`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" DROP COLUMN "accountAccountNumber"`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" ADD "accountAccountNumber" integer`);
            yield queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08"`);
            yield queryRunner.query(`ALTER TABLE "account" DROP COLUMN "accountNumber"`);
            yield queryRunner.query(`ALTER TABLE "account" ADD "accountNumber" SERIAL NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08" PRIMARY KEY ("accountNumber")`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354" FOREIGN KEY ("accountAccountNumber") REFERENCES "account"("accountNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.AccountPrimaryColumn1617218386924 = AccountPrimaryColumn1617218386924;
