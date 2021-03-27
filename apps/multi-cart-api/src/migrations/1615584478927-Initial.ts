import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1615584478927 implements MigrationInterface {
    name = 'Initial1615584478927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_line" ("id" SERIAL NOT NULL, "itemId" character varying NOT NULL, "description" character varying NOT NULL, "uom" character varying NOT NULL, "quantity" integer NOT NULL, "categoryId" integer NOT NULL, "price" integer NOT NULL, "cartId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b3414ce0b103b3ff0743ebd3a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isCurrentCart" boolean NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_line" ADD CONSTRAINT "FK_e4ebe82255b564027ae01acd239" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_line" DROP CONSTRAINT "FK_e4ebe82255b564027ae01acd239"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "cart_line"`);
    }

}
