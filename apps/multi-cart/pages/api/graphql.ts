import { Session } from "express-session";
import { schema } from '@multi-cart/mock-api';
import { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

// thx: https://www.graphql-tools.com/docs/mocking/
export default async function handler(req: Request & { session: Session & { userId?: number } }, res: Response) {
    req.is = (type: string | string[]) =>
        typeof type === 'string' && !!req.headers['content-type'] && req.headers['content-type'].includes(type)
            ? type
            : null;

    // spoof logged-in user
    // NOTE: not working
    (req as any).session = {
        userId: 1
    };

    return graphqlHTTP({
        schema,
        graphiql: true,
    })(req, res);
}




