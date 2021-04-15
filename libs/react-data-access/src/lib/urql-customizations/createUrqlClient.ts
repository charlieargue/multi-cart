// - https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
import { devtoolsExchange } from '@urql/devtools';
import { dedupExchange, Exchange, fetchExchange } from 'urql';
import { pipe, tap } from 'wonka'; // part of urql!
import { cache } from './cache';

const API_URL = process.env.API_URL || 'http://localhost:4000/graphql'; // defaults to NODE backend
console.log(`🚀 ~ API_URL`, API_URL);

// thx: https://github.com/FormidableLabs/urql/issues/225
// BEN 6:15:38
const errorExchange: Exchange = ({ forward }) => ops$ => {

    // streams are back! 
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            console.log(`🚀 ~ error`, error);

            // anytime there's an error in anything we run..
            // 🛡 sentry fire-and-forget CALL would go here!
            
            // ERROR IF INCLUDED: 
            // You may need an additional loader to handle the result of these loaders.
            // if (error?.message.includes("not authenticated")) {
            //     Router.replace("/login"); // since kinda wanna REDIRECT, then use .replace()
            // }

            // TODO: display a toast! but how? cant just include useToast() in here... TBD


        })
    );
};


// [ ] TODO: global error handling goes here (unauth redirects/verifies)
export const createUrqlClient = (ssrExchange: any) => ({

    url: API_URL,
    fetchOptions: {
        // VIP: session cookies will NOT work without this
        credentials: "include" as const
    },
    exchanges: [
        devtoolsExchange,
        dedupExchange,
        cache,
        errorExchange,
        ssrExchange,
        fetchExchange],
})