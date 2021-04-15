
import { schema } from '@multi-cart/mock-api';
import { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

export default async function handler(req: Request, res: Response) {
    req.is = (type: string | string[]) =>
        typeof type === 'string' && !!req.headers['content-type'] && req.headers['content-type'].includes(type)
            ? type
            : null;

    return graphqlHTTP({
        schema,
        graphiql: true,
    })(req, res);
}




