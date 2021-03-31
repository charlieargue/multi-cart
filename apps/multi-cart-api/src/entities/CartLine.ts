import { Field, Int, ObjectType } from "type-graphql";
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
    @Column()
    description: string;

    @Field(() => String, { nullable: true })
    @Column()
    uom: string;

    @Field(() => Int, { nullable: true })
    @Column()
    quantity: number;

    @Field(() => Int, { nullable: true })
    @Column()
    categoryId: number;

    // ❌ Don't use FLOAT in @Field
    @Field()
    @Column({ type: "float", default: 0 })
    price: number;


    // ------------------------
    // FKs
    // ------------------------
    @Field(() => Int)
    @Column()
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