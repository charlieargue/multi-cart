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
exports.Cart = void 0;
var type_graphql_1 = require("type-graphql");
var typeorm_1 = require("typeorm");
var CartLine_1 = require("./CartLine");
var User_1 = require("./User");
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart() {
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
    ], Cart.prototype, "id");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.Column()
    ], Cart.prototype, "name");
    __decorate([
        type_graphql_1.Field(function () { return type_graphql_1.Int; }),
        typeorm_1.Column()
    ], Cart.prototype, "userId");
    __decorate([
        type_graphql_1.Field(function () { return [CartLine_1.CartLine]; }),
        typeorm_1.OneToMany(function () { return CartLine_1.CartLine; }, function (cartLine) { return cartLine.cart; })
    ], Cart.prototype, "cartLines");
    __decorate([
        type_graphql_1.Field(function () { return User_1.User; }),
        typeorm_1.ManyToOne(function () { return User_1.User; }, function (user) { return user.carts; })
    ], Cart.prototype, "user");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.CreateDateColumn()
    ], Cart.prototype, "createdAt");
    __decorate([
        type_graphql_1.Field(function () { return String; }),
        typeorm_1.UpdateDateColumn()
    ], Cart.prototype, "updatedAt");
    Cart = __decorate([
        type_graphql_1.ObjectType(),
        typeorm_1.Entity()
    ], Cart);
    return Cart;
}(typeorm_1.BaseEntity));
exports.Cart = Cart;
