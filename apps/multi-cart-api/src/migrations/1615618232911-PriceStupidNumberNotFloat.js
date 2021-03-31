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
exports.PriceStupidNumberNotFloat1615618232911 = void 0;
class PriceStupidNumberNotFloat1615618232911 {
    constructor() {
        this.name = 'PriceStupidNumberNotFloat1615618232911';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line" DROP COLUMN "price"`);
            yield queryRunner.query(`ALTER TABLE "cart_line" ADD "price" double precision NOT NULL DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line" DROP COLUMN "price"`);
            yield queryRunner.query(`ALTER TABLE "cart_line" ADD "price" integer NOT NULL`);
        });
    }
}
exports.PriceStupidNumberNotFloat1615618232911 = PriceStupidNumberNotFloat1615618232911;
