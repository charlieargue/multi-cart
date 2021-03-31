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


        // ✅ GOOD!
        // const qb = getConnection()
        //     .getRepository(Cart)
        //     .createQueryBuilder("c")
        //     .leftJoinAndSelect("c.cartLines", "cart_line")
        //     .orderBy("c.createdAt", "DESC")
        //     .where("c.userId = :id", { id: req.session.userId })
        //     .take();
        // return qb.getMany();



        // ❓ NO BUENO?
        const qb = getConnection()
            .getRepository(Cart)
            .createQueryBuilder("c")
            .leftJoinAndSelect("c.cartLines", "cart_line")
            .leftJoinAndSelect("cart_line.cartLineAccounts", "cart_line_account")
            .orderBy("c.createdAt", "DESC")
            .where("c.userId = :id", { id: req.session.userId });
        return qb.getMany();
        
        
        
            //     .select('*')
        //     // .orderBy("c.createdAt", "DESC")
        //     // .take();  // DECOMISH?
        // // .select('cl.*')
        // // .addSelect('cl.id', 'cl_id')
        // // .addSelect('t3.event', 't3_event')
        // // .addSelect('t4.column1', 't4_column1') // up to this point: SELECT t1.id,t2.id_2,t3.event,t3.column1,t4.column1 FROM table1 t1
        // // .innerJoin(table3, 't3', 't2.event = t3.event') // INNER JOIN table3 t3 ON t2.event = t3.event
        // // .innerJoin(table4, 't4', 't4.id = t2.id_2') // INNER JOIN table4 t4 ON t4.id = t2.id_2 
        // // .where("c.userId = :id", { id: req.session.userId });





        // // .leftJoinAndSelect("c.cartLines", "cart_line")
        // // .leftJoinAndSelect("cart_line", "cart_line")
        // // .orderBy("c.createdAt", "DESC")
        // // .where("c.userId = :id", { id: req.session.userId });
        // return qb.getMany();

        // thx: https://stackoverflow.com/questions/54998520/multiple-join-with-typeorm
        // thx: https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md#getting-values-using-querybuilder

        // .addSelect('t1.id', 't1_id')
        // .addSelect('t2.id_2', 't2_id_2')
        // .addSelect('t3.event', 't3_event')
        // .addSelect('t4.column1', 't4_column1') // up to this point: SELECT t1.id,t2.id_2,t3.event,t3.column1,t4.column1 FROM table1 t1
        // .innerJoin(table2, 't2', 't1.id = t2.id') //INNER JOIN table2 t2 ON t1.id = t2.id
        // .innerJoin(table3, 't3', 't2.event = t3.event') // INNER JOIN table3 t3 ON t2.event = t3.event
        // .innerJoin(table4, 't4', 't4.id = t2.id_2') // INNER JOIN table4 t4 ON t4.id = t2.id_2 
        // .where('t3.event = 2019') // WHERE t3.event = 2019
        // .getRawMany() // depend on what you need really
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
    ): Promise<boolean> {

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