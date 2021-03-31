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
exports.CartLineAccounts1617211929390 = void 0;
class CartLineAccounts1617211929390 {
    constructor() {
        this.name = 'CartLineAccounts1617211929390';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "account" ("accountNumber" SERIAL NOT NULL, "accountName" character varying NOT NULL, "amountRemaining" double precision NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee66d482ebdf84a768a7da36b08" PRIMARY KEY ("accountNumber"))`);
            yield queryRunner.query(`CREATE TABLE "cart_line_account" ("id" SERIAL NOT NULL, "amount" double precision NOT NULL DEFAULT '0', "accountNumber" character varying NOT NULL, "cartLineId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "accountAccountNumber" integer, CONSTRAINT "PK_b6e7c1b18d459e6820cbf28acff" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354" FOREIGN KEY ("accountAccountNumber") REFERENCES "account"("accountNumber") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_46c6eac877c331217bd00a5f581" FOREIGN KEY ("cartLineId") REFERENCES "cart_line"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_46c6eac877c331217bd00a5f581"`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_eb696af2d14e14d52a13cd3d354"`);
            yield queryRunner.query(`DROP TABLE "cart_line_account"`);
            yield queryRunner.query(`DROP TABLE "account"`);
        });
    }
}
exports.CartLineAccounts1617211929390 = CartLineAccounts1617211929390;
