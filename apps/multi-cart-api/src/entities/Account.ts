import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Account extends BaseEntity {

  @Field(() => String, { nullable: false })
  @PrimaryColumn("varchar", {
    length: 20,
    unique: true
  })
  accountNumber!: string; // i.e. 1234-123-12-12345

  @Field(() => String)
  @Column()
  accountName: string; // i.e. Selena Meyer Fund

  // ❌ Don't use FLOAT in @Field
  @Field()
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