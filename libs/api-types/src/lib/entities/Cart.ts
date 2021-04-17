import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartLine } from "./CartLine";
import { User } from "./User";

@ObjectType()
@Entity()
export class Cart extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    // ------------------------
    // FKs
    // ------------------------
    @Field(() => Int)
    @Column()
    userId!: number;
    
    // ------------------------
    // ASSOCIATIONS
    // ------------------------
    @Field(() => [CartLine])
    @OneToMany(() => CartLine, (cartLine) => cartLine.cart)
    cartLines: CartLine[];

    @Field(() => User)
    @ManyToOne(() => User, user => user.carts)
    user: User;


    // timestamps
    // ------------------------
    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();

}