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
exports.User = void 0;
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var Cart_1 = require("./Cart");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.updatedAt = new Date();
        return _this;
    }
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }),
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ unique: true })
    ], User.prototype, "username");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column({ unique: true })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column({ type: "string" })
    ], User.prototype, "password");
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }, { nullable: true }),
        typeorm_1.Column({ nullable: true })
    ], User.prototype, "currentCartId");
    __decorate([
        typeorm_1.OneToMany(function () { return Cart_1.Cart; }, function (cart) { return cart.user; })
    ], User.prototype, "carts");
    __decorate([
        typeorm_1.OneToOne(function () { return Cart_1.Cart; }, { nullable: true }),
        typeorm_1.JoinColumn()
    ], User.prototype, "currentCart");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.CreateDateColumn()
    ], User.prototype, "createdAt");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.UpdateDateColumn()
    ], User.prototype, "updatedAt");
    User = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.User = User;
