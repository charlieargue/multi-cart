import { CartLine } from '../entities/CartLine';
import { Arg, Ctx, Field, Float, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Cart } from '../entities/Cart';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@InputType()
class CartLineInput {

    @Field(() => Int)
    id: number;

    @Field(() => Int)
    cartId: number;

    @Field(() => Int)
    categoryId: number;

    @Field(() => Int)
    quantity: number;

    @Field(() => Float)
    price: number;

    @Field()
    itemId: string

    @Field()
    description: string

    @Field()
    uom: string

}

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
            .orderBy("c.createdAt", "DESC")
            .where("c.userId = :id", { id: req.session.userId })
            .take();
        return qb.getMany();
    }

    @Query(() => Cart, { nullable: true })
    @UseMiddleware(isAuth) // 🛡
    cart(@Arg("id", () => Int) id: number): Promise<Cart | undefined> {
        const qb = getConnection()
            .getRepository(Cart)
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.cartLines", "cart_line")
            .where("c.id = :id", { id });
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
        } catch (err) {
            console.log("🚀 ~ err", err)
            return new Error('🔴 could not create blank cart');
        }
        const { raw } = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Cart)
            .values([fresh as any])
            .returning("*")
            .execute();

        const newCart = raw[0] as Cart;
        newCart.cartLines = [];

        return newCart;
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
        } catch (err) {
            console.log("🚀 ~ err", err)
            return new Error('🔴 could not create blank cart LINE');
        }
        const { raw } = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(CartLine)
            .values([fresh as any])
            .returning("*")
            .execute();

        const newCartLine = raw[0] as CartLine;
        return newCartLine;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth) // 🛡
    async deleteCart(
        @Arg('id', () => Int) id: number,
    ): Promise<Boolean> {

        // cascade cartlines is ON!
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
        // NOTE: only because started with NON relational! non-unique cartLine IDs
        @Arg('cartId', () => Int) _cartId: number,
        @Arg('cartLineId', () => Int) cartLineId: number,
    ): Promise<Boolean> {
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
    ): Promise<CartLine | Error | null> {

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
        return raw[0];
    }

}