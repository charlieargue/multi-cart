import { buildSchema } from "type-graphql";
import { UserResolver } from "../../resolvers/user";


export const createSchema = () =>
    buildSchema({
        resolvers: [
            UserResolver
        ],
        // do I need this?
        authChecker: ({ context: { req } }) => {
            return !!req.session.userId;
        }
    });