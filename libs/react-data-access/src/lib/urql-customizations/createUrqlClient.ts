// - https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
import { devtoolsExchange } from '@urql/devtools';
import { dedupExchange, fetchExchange } from 'urql';
import { cache } from './cache';

// [ ] TODO: global error handling goes here (unauth redirects/verifies)

export const createUrqlClient = (ssrExchange: any) => ({

    url: 'http://localhost:4000/graphql', // REAL POSTGRES/NODE/GQL Server
    // url: 'http://localhost:3000/api/graphql',    // mocked API on FE/next
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