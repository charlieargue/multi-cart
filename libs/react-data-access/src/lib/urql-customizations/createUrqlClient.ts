// - https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
import { devtoolsExchange } from '@urql/devtools';
import { dedupExchange, fetchExchange } from 'urql';
// import { pipe, tap } from 'wonka'; // part of urql!
import { cache } from './cache';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(`🚀 ~ NEXT_PUBLIC_API_URL`, NEXT_PUBLIC_API_URL);

// TODO: things got wonky here, bring this back once stable again...
// TODO: ditto for devtools
// thx: https://github.com/FormidableLabs/urql/issues/225
// BEN 6:15:38
// const errorExchange: Exchange = ({ forward }) => ops$ => {

//     // streams are back! 
//     return pipe(
//         forward(ops$),
//         tap(({ error }) => {
//             console.log(`🚀 ~ error`, error);

// anytime there's an error in anything we run..
// 🛡 sentry fire-and-forget CALL would go here!

//             // ERROR IF INCLUDED: 
//             // You may need an additional loader to handle the result of these loaders.
//             // if (error?.message.includes("not authenticated")) {
//             //     Router.replace("/login"); // since kinda wanna REDIRECT, then use .replace()
//             // }

//             // TODO: display a toast! but how? cant just include useToast() in here... TBD


//         })
//     );
// };


// [ ] TODO: global error handling goes here (unauth redirects/verifies)
export const createUrqlClient = (ssrExchange: any) => ({

    url: NEXT_PUBLIC_API_URL,
    fetchOptions: {
        // VIP: session cookies will NOT work without this
        credentials: "include" as const,
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
    },
    exchanges: [
        devtoolsExchange,
        dedupExchange,
        cache,
        // errorExchange,
        ssrExchange,
        fetchExchange],
})