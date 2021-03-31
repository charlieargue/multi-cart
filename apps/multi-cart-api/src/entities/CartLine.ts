import { Field, Float, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./Cart";

@ObjectType()
@Entity()
export class CartLine extends BaseEntity {


    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String, { nullable: true })
    @Column()
    itemId: string;

    @Field(() => String, { nullable: true })
    @Column({type: "string"})
    description: string;

    @Field(() => String, { nullable: true })
    @Column({type: "string"})
    uom: string;

    @Field(() => Int, { nullable: true })
    @Column({type: "number"})
    quantity: number;

    @Field(() => Int, { nullable: true })
    @Column({type: "number"})
    categoryId: number;

    @Field(() => Float)
    @Column({ type: "float", default: 0 })
    price: number;


    // ------------------------
    // FKs
    // ------------------------
    @Field(() => Int)
    @Column({type: "number"})
    cartId!: number;


    // ------------------------
    // ASSOCIATIONS
    // ------------------------
    @Field(() => Cart, { nullable: true })
    @ManyToOne(() => Cart, (cart) => cart.cartLines, {
        onDelete: "CASCADE",
    })
    cart?: Cart;


    // timestamps
    // ------------------------
    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();

}
