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
exports.DataHydrationAccounts1617219691116 = void 0;
const mock_accounts_1 = require("../test/mock-data/mock-accounts");
class DataHydrationAccounts1617219691116 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(mock_accounts_1.mockAccounts);
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
}
exports.DataHydrationAccounts1617219691116 = DataHydrationAccounts1617219691116;
