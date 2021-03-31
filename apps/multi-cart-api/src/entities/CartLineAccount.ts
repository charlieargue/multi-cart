import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from './Account';
import { CartLine } from './CartLine';

// ------------------------
// J O I N     T A B L E  (explicit)
// ------------------------

@ObjectType()
@Entity()
export class CartLineAccount extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    // EXTRA COLUMNs
    // ------------------------
    @Field()
    @Column({ type: "float", default: 0 })
    amount!: number; // in case prices change and not managing that history

    // JOIN COLUMNS (FKs)
    // ------------------------
    @Field()
    @Column()
    accountNumber: string;

    @Field()
    @Column()
    cartLineId: number;

    // ASSOCIATIONS (only @manyToOne, no inverse @oneToMany needed on outer entities)
    // ------------------------
    // @Field(() => Account) // WHY gql?
    @ManyToOne(() => Account) // NOTE: these can be one-sided, unlike @OneToMany
    account: Account;


    // @Field(() => CartLine)
    @ManyToOne(() => CartLine)
    cartLine : CartLine;


    // timestamps
    // ------------------------
    @Field(() => String)
    @CreateDateColumn()
    createdAt = new Date();

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt = new Date();
}
