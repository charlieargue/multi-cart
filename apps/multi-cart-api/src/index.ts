import { Account, Cart, CartLine, CartLineAccount, User } from '@multi-cart/api-types';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import session from 'express-session';
import Redis from 'ioredis';
import path from 'path';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIENAME, __prod__ } from './constants';
import { AccountResolver } from './resolvers/account';
import { CartResolver } from './resolvers/cart';
import { UserResolver } from './resolvers/user';
import { MyContext } from "./types";
dotenv.config();


// ------------------------
const main = async () => {

    // NOT WORKING: 
    const pathToMigrations = path.join(__dirname, "../../..", "apps/multi-cart-api/src/migrations/*.js");
    const conn = await createConnection({
        type: 'postgres',
        database: 'multi-cart-db',
        username: process.env.PG_USERNAME,
        password: process.env.PG_PWD,
        logging: true,
        entities: [User, Cart, CartLine, CartLineAccount, Account],
        migrations: [pathToMigrations],
    });
    conn.runMigrations();

    const app = express();

    // redis 🔥 MUST RUN FIRST! (before graphql/apollo middleware, ORDER MATTERS)
    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(cors({
        origin: 'http://localhost:4200', // AKA the client/FE
        credentials: true
    }));

    app.use(
        session({
            name: COOKIENAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true, // no Front-end access to cookie!
                secure: __prod__, // cookie only works in https IN PROD!
                sameSite: 'lax', // protects against csrf 
            },
            saveUninitialized: false,
            secret: process.env.SESSION_COOKIE_SECRET as string | string[],
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({

        schema: await buildSchema({
            resolvers: [CartResolver, UserResolver, AccountResolver],
            validate: false
        }),
        context: ({ req, res }): MyContext => ({
            req,
            res,
            redis
        })
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
        // cors: {
        //     origin: 'http://localhost:3000'
        // }
    });

    // start
    app.listen(4000, () => {
        console.log("🚀 multi-cart-postgres-be 💥 SERVER STARTED on http://localhost:4000/graphql ");
    });
};

main().catch(err => {
    console.log("🚀 ~ err", err)
});
