"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartLineAccount = void 0;
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var Account_1 = require("./Account");
var CartLine_1 = require("./CartLine");
// ------------------------
// J O I N     T A B L E  (explicit)
// ------------------------
var CartLineAccount = /** @class */ (function (_super) {
    __extends(CartLineAccount, _super);
    function CartLineAccount() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // timestamps
        // ------------------------
        _this.createdAt = new Date();
        _this.updatedAt = new Date();
        return _this;
    }
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.PrimaryGeneratedColumn()
    ], CartLineAccount.prototype, "id");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column({ type: "float", "default": 0 })
    ], CartLineAccount.prototype, "amount");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column()
    ], CartLineAccount.prototype, "accountNumber");
    __decorate([
        type_graphql_1.Field(),
        typeorm_1.Column()
    ], CartLineAccount.prototype, "cartLineId");
    __decorate([
        typeorm_1.ManyToOne(function () { return Account_1.Account; }) // NOTE: these can be one-sided, unlike @OneToMany
    ], CartLineAccount.prototype, "account");
    __decorate([
        typeorm_1.ManyToOne(function () { return CartLine_1.CartLine; })
    ], CartLineAccount.prototype, "cartLine");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.CreateDateColumn()
    ], CartLineAccount.prototype, "createdAt");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.UpdateDateColumn()
    ], CartLineAccount.prototype, "updatedAt");
    CartLineAccount = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], CartLineAccount);
    return CartLineAccount;
}(typeorm_1.BaseEntity));
exports.CartLineAccount = CartLineAccount;
