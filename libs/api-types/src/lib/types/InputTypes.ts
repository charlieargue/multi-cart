import { InputType, Field, Int, Float } from 'type-graphql';
import "reflect-metadata";

@InputType()
export class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class CartLineInput {

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


@InputType()
export class CartInput {

    @Field(() => Int)
    id: number;

    @Field()
    name: string

}

