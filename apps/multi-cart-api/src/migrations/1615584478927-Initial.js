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
exports.Initial1615584478927 = void 0;
class Initial1615584478927 {
    constructor() {
        this.name = 'Initial1615584478927';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "cart_line" ("id" SERIAL NOT NULL, "itemId" character varying NOT NULL, "description" character varying NOT NULL, "uom" character varying NOT NULL, "quantity" integer NOT NULL, "categoryId" integer NOT NULL, "price" integer NOT NULL, "cartId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b3414ce0b103b3ff0743ebd3a9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isCurrentCart" boolean NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_e4ebe82255b564027ae01acd239" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_e4ebe82255b564027ae01acd239"`);
            yield queryRunner.query(`DROP TABLE "cart"`);
            yield queryRunner.query(`DROP TABLE "cart_line"`);
        });
    }
}
exports.Initial1615584478927 = Initial1615584478927;
