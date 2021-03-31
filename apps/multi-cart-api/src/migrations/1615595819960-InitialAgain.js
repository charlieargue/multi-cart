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
exports.InitialAgain1615595819960 = void 0;
class InitialAgain1615595819960 {
    constructor() {
        this.name = 'InitialAgain1615595819960';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_e4ebe82255b564027ae01acd239"`);
            yield queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_e4ebe82255b564027ae01acd239" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_e4ebe82255b564027ae01acd239"`);
            yield queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_e4ebe82255b564027ae01acd239" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.InitialAgain1615595819960 = InitialAgain1615595819960;
