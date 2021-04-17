import { Cart, CartLine, User } from '@multi-cart/api-types';
import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { CartInput, CartLineInput } from './types/InputTypes';

@Resolver(Cart)
export class CartResolver {

    @Query(() => [Cart])
    @UseMiddleware(isAuth) // 🛡
    carts(
        @Ctx() { req }: MyContext
    ): Promise<Cart[]> {

        const qb = getConnection()
            .getRepository(Cart)
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.cartLines", "cart_line")
            .leftJoinAndSelect("cart_line.cartLineAccounts", "cart_line_account")
            .orderBy("c.createdAt", "DESC")
            .where("c.userId = :id", { id: req.session.userId });
        return qb.getMany();
    }

    @Query(() => Cart, { nullable: true })
    @UseMiddleware(isAuth) // 🛡
    cart(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: MyContext
    ): Promise<Cart | undefined> {
        const qb = getConnection()
            .getRepository(Cart)
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.cartLines", "cart_line")
            .leftJoinAndSelect("cart_line.cartLineAccounts", "cart_line_account")
            .where("c.id = :id AND c.userId = :userId", { id, userId: req.session.userId });
        return qb.getOne();
    }


    @Mutation(() => Cart)
    @UseMiddleware(isAuth) // 🛡
    async blankCart(
        @Ctx() { req }: MyContext
    ): Promise<Cart | Error> {
        const fresh = {
            name: "Cart: " + new Date().toLocaleTimeString(),
            userId: req.session.userId,
            cartLines: [],
        };
        try {
            const { raw } = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Cart)
                .values([fresh as unknown as Cart])
                .returning("*")
                .execute();

            const newCart = raw[0] as Cart;
            newCart.cartLines = [];

            return newCart;
        } catch (err) {
            console.log("🚀 ~ err", err)
            return new Error('🔴 could not create blank cart');
        }
    }

    @Mutation(() => CartLine)
    @UseMiddleware(isAuth) // 🛡
    async blankCartLine(
        @Arg('cartId', () => Int) cartId: number,
    ): Promise<CartLine | Error> {
        // create a new cart line
        const fresh: CartLine = {
            cartId: cartId,
            itemId: "",
            description: "",
            categoryId: 1,
            uom: "EACH",
            quantity: 1,
            price: 0,
        } as CartLine;
        try {

            const { raw } = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(CartLine)
                .values([fresh as CartLine])
                .returning("*")
                .execute();

            const newCartLine = raw[0] as CartLine;
            return newCartLine;
        } catch (err) {
            console.log("🚀 ~ err", err)
            return new Error('🔴 could not create blank cart LINE');
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth) // 🛡
    async deleteCart(
        @Arg('id', () => Int) id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        // TODO: add security on all these deletes/updates (that only owner of cart can do so!)
        // 🛡 TODO: make this a re-usable method, since commonly done (find this cart for this currently-logged-in user, find a cart_line for ditto, CLA, etc...)

        // set user.currentCartId = null since there's an FK there!
        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ currentCartId: undefined })
            .where('id = :id', {
                id: req.session.userId,
            })
            .execute();

        // cascade cartlines & cartLineAccounts is ON!
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Cart)
            .where("id = :id", { id })
            .execute();

        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth) // 🛡
    async deleteCartLine(
        // NOTE: only because started with NON relational! non-unique cartLine IDs (afaik this is b/c either Mock-API-start or urql graph-cache needs it...)
        @Arg('cartId', () => Int) _cartId: number,
        @Arg('cartLineId', () => Int) cartLineId: number,
    ): Promise<boolean> {
        // cascade cartlines is ON!
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(CartLine)
            .where("id = :id", { id: cartLineId })
            .execute();

        return true;
    }

    @Mutation(() => CartLine, { nullable: true })
    @UseMiddleware(isAuth) // 🛡
    async updateCartLine(
        @Arg('cartLine', () => CartLineInput) cartLine: CartLineInput,
    ): Promise<CartLine | Error | undefined> {

        // TODO: security checks, and check each one here!!!

        const { raw } = await getConnection()
            .createQueryBuilder()
            .update(CartLine)
            .set(
                { ...cartLine }
            )
            .where('id = :id', {
                id: cartLine.id
            })
            .returning("*")
            .execute();

        // TODO: cart query has cart.userId and the case issue is ok, but not on updateCart()? why?
        // NOTE: needed to return cartLine.cartLineAccounts hydrated, but not sure how to do it in one query builder call
        const qb = getConnection()
            .getRepository(CartLine)
            .createQueryBuilder("cl")
            .leftJoinAndSelect("cl.cartLineAccounts", "cart_line_account")
            // .orderBy("c.createdAt", "DESC")
            .where("cl.id = :id", { id: raw[0].id });
        return qb.getOne();
    }

    @Mutation(() => Cart, { nullable: true })
    @UseMiddleware(isAuth) // 🛡
    async updateCart(
        @Arg('cart', () => CartInput) cart: CartInput,
        @Ctx() { req }: MyContext
    ): Promise<Cart | Error | undefined> {

        const { raw } = await getConnection()
            .createQueryBuilder()
            .update(Cart)
            .set(
                { name: cart.name }
            )
            .where("id = :id AND userId = :userId", { id: cart.id, userId: req.session.userId })
            .returning("*")
            .execute();

        // NOTE: this auto-updates in the normalized graphcache! 
        // TODO: good thing to have in a cypress test! (check the cart avatar drop-down, did the cart name update?)
        return raw[0];
    }

}