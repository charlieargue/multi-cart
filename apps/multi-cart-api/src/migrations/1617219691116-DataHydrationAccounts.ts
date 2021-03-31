import {MigrationInterface, QueryRunner} from "typeorm";
import { mockAccounts } from "../test/mock-data/mock-accounts";

export class DataHydrationAccounts1617219691116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(mockAccounts);
    }

    public async down(): Promise<void> {
        return;
    }
}
