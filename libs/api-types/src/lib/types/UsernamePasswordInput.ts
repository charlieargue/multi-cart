import { InputType, Field } from 'type-graphql';

@InputType()
export class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}
