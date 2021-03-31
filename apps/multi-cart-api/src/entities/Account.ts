import { Field, Float, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Account extends BaseEntity {

    @Field(() => String)
    @PrimaryGeneratedColumn()
    accountNumber!: string; // i.e. 1234-123-12-12345
    
    @Field(() => String)
    @Column({type: "string"})
    accountName: string; // i.e. Selena Meyer Fund

    @Field(() => Float)
    @Column({ type: "float", default: 0 })
    amountRemaining: number;

    // ------------------------
    // ASSOCIATIONS
    // ------------------------


    // timestamps
    // ------------------------
    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();

}
