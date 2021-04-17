import { Arg, Ctx, Float, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Account, Cart, CartLine, CartLineAccount } from '@multi-cart/api-types';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';


@Resolver(Account)
export class AccountResolver {

    @Query(() => [Account])
    @UseMiddleware(isAuth) // 🛡
    accounts(): Promise<Account[]> {
        // ------------------------
        const qb = getConnection()
            .getRepository(Account)
            .createQueryBuilder("a")
            .orderBy("a.accountName", "ASC");
        return qb.getMany();
    }

    // TODO: make this an input type
    @Mutation(() => CartLineAccount)
    @UseMiddleware(isAuth) // 🛡
    async addCartLineAccount(
        @Arg('cartId', () => Int) _: number, // NOTE: this is needed during graph cache update
        @Arg('cartLineId', () => Int) cartLineId: number,
        @Arg('accountNumber', () => String) accountNumber: string,
        @Arg('amount', () => Float) amount: number,
        @Ctx() { req }: MyContext
    ): Promise<CartLineAccount | Error> {
        try {
            // make sure this cartLine EXISTS AND belongs to currently-logged-in user
            // make sure the account number exists AND has remaining funds!
            // insert new record into CLA
            const foundAccount = await Account.findOne(accountNumber);
            const foundCartLine = await CartLine.findOne(cartLineId);
            const foundCart = await Cart.findOne(foundCartLine?.cartId, {
                where: {
                    userId: req.session.userId,
                }
            });
            if (foundCart && foundCartLine && foundAccount) {
                const hasSufficientFunds: boolean = (foundAccount.amountRemaining - amount > 0);
                if (!hasSufficientFunds) {
                    throw new Error(`Insufficient Account Funds: FUND: ${foundAccount.accountNumber}, NAME: ${foundAccount.accountName}, REQUEST AMOUNT: $${amount}, REMAINING: $${foundAccount.amountRemaining}`);
                }
                return CartLineAccount.create({ amount, accountNumber, cartLineId }).save();
            }
        } catch (err) {
            console.log("🔴 ~ err", err)
            // TODO: this needs to return a RegularResponse with errors in it, like RegularUserResponse
        }
        return new Error('🔴 could not create CART LINE ACCOUNT');
    }

    @Mutation(() => CartLineAccount)
    @UseMiddleware(isAuth) // 🛡
    async updateCartLineAccount(
        // @Arg('cartId', () => Int) _: number, // NOTE: this is needed during graph cache update
        @Arg('id', () => Int) id: number,
        @Arg('amount', () => Float) amount: number,
        @Ctx() { req }: MyContext
    ): Promise<CartLineAccount | Error> {
        try {
            // make sure this cartLine EXISTS AND belongs to currently-logged-in user
            // make sure the account number exists AND has remaining funds!
            // insert new record into CLA
            // NOTE: if I had added the  
            const qb = getConnection()
                .getRepository(CartLineAccount)
                .createQueryBuilder("cla")
                .leftJoinAndSelect("cla.cartLine", "cart_line")
                .leftJoinAndSelect("cart_line.cart", "cart")
                .where("cla.id = :id AND cart.userId = :userId", { id, userId: req.session.userId });

            const foundCartLineAccount = await qb.getOne();


            if (foundCartLineAccount) {
                const result = await getConnection()
                    .createQueryBuilder()
                    .update(CartLineAccount)
                    .set({ amount })
                    .where('id = :id', { id })
                    .returning("*")
                    .execute();
                return result.raw[0];
            }
        } catch (err) {
            console.log("🔴 ~ err", err)
            // TODO: this needs to return a RegularResponse with errors in it, like RegularUserResponse
        }
        return new Error('🔴 could not update CART LINE ACCOUNT');
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth) // 🛡
    async deleteCartLineAccount(
        @Arg('cartLineAccountId', () => Int) cartLineAccountId: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean | Error> {
        // cascade delete cartlineaccounts is ON!
        // NOTE: couldn't get the deep select + DELETE in one command...
        try {
            const qb = getConnection()
                .getRepository(CartLineAccount)
                .createQueryBuilder("cla")
                .leftJoinAndSelect("cla.cartLine", "cart_line")
                .leftJoinAndSelect("cart_line.cart", "cart")
                .where("cla.id = :id AND cart.userId = :userId", { id: cartLineAccountId, userId: req.session.userId });

            const foundCartLineAccount = await qb.getOne();
            if (foundCartLineAccount) {
                await foundCartLineAccount.remove();
                return true;
            }
        } catch (err) {
            console.log("🔴 ~ err", err)
            // TODO: this needs to return a RegularResponse with errors in it, like RegularUserResponse
        }
        return new Error('🔴 could not delete CART LINE ACCOUNT');
    }


}