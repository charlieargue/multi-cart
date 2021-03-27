// import { mockCarts } from "../test/mock-data/mock-carts";
import { MigrationInterface } from "typeorm";



export class DataHydration1615584540770 implements MigrationInterface {

    public async up(/*queryRunner: QueryRunner*/): Promise<void> {
        // await queryRunner.query(mockCarts);
    }

    public async down(): Promise<void> {
        return;
    }

}
