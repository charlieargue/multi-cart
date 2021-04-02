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
exports.CartLineAccountsCascadeDelete1617329988252 = void 0;
class CartLineAccountsCascadeDelete1617329988252 {
    constructor() {
        this.name = 'CartLineAccountsCascadeDelete1617329988252';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_46c6eac877c331217bd00a5f581"`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_46c6eac877c331217bd00a5f581" FOREIGN KEY ("cartLineId") REFERENCES "cart_line"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line_account" DROP CONSTRAINT "FK_46c6eac877c331217bd00a5f581"`);
            yield queryRunner.query(`ALTER TABLE "cart_line_account" ADD CONSTRAINT "FK_46c6eac877c331217bd00a5f581" FOREIGN KEY ("cartLineId") REFERENCES "cart_line"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.CartLineAccountsCascadeDelete1617329988252 = CartLineAccountsCascadeDelete1617329988252;
