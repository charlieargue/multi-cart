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
exports.CurrentCartIdExplicit1616026798220 = void 0;
class CurrentCartIdExplicit1616026798220 {
    constructor() {
        this.name = 'CurrentCartIdExplicit1616026798220';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aff88046a76e55c10156f1a2f84"`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "currentCartId" SET NOT NULL`);
            yield queryRunner.query(`COMMENT ON COLUMN "user"."currentCartId" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aff88046a76e55c10156f1a2f84" FOREIGN KEY ("currentCartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_aff88046a76e55c10156f1a2f84"`);
            yield queryRunner.query(`COMMENT ON COLUMN "user"."currentCartId" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "currentCartId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_aff88046a76e55c10156f1a2f84" FOREIGN KEY ("currentCartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.CurrentCartIdExplicit1616026798220 = CurrentCartIdExplicit1616026798220;
