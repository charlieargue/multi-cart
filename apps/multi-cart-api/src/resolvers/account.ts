import { Arg, Ctx, Float, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Account } from '../entities/Account';
import { Cart } from '../entities/Cart';
import { CartLine } from '../entities/CartLine';
import { CartLineAccount } from '../entities/CartLineAccount';
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

    @Mutation(() => CartLineAccount)
    @UseMiddleware(isAuth) // 🛡
    async addCartLineAccount(
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

}