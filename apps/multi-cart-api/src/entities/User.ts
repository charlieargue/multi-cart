import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./Cart";

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ unique: true })
    username!: string;

    @Field(() => String)
    @Column({ unique: true })
    email!: string;

    // 🛡 NO @Field(() => String)
    @Column()
    password!: string;

    // ------------------------
    // FKs
    // ------------------------
    // this would be auto-generated, but I want it explicitly
    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    currentCartId?: number;

    // ------------------------
    // ASSOCIATIONS
    // ------------------------
    @OneToMany(() => Cart, (cart) => cart.user)
    carts: Cart[];

    @OneToOne(() => Cart, { nullable: true })
    @JoinColumn()
    currentCart?: Cart;

    // timestamps
    // ------------------------
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();

}
