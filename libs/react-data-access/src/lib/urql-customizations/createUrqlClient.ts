// - https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
import { devtoolsExchange } from '@urql/devtools';
import { dedupExchange, fetchExchange } from 'urql';
import { cache } from './cache';

const API_URL = process.env.API_URL || 'http://localhost:4000/graphql'; // defaults to NODE backend
console.log(`🚀 ~ API_URL`, API_URL);

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
        ssrExchange,
        fetchExchange],
})