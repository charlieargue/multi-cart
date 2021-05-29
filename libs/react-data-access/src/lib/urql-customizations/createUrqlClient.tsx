// NOTE: moved here from data-access project since needed window.localstorage!

// - https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
import { devtoolsExchange } from '@urql/devtools';
import { dedupExchange, Exchange, fetchExchange } from 'urql';
import { pipe, tap } from 'wonka'; // part of urql!
import { cache } from './cache';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// TODO: ditto for devtools
// thx: https://github.com/FormidableLabs/urql/issues/225
// BEN 6:15:38
const errorExchange: Exchange = ({ forward }) => ops$ => {

    // streams are back! 
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            console.log(`🚀 ~ error`, error);

            // TODO: anytime there's an error in anything we run..
            // 🛡 sentry fire-and-forget CALL would go here!

            // TODO: display a toast! but how? cant just include useToast() in here... TBD

        })
    );
};

const getToken = () =>
    typeof window !== 'undefined'
        ? localStorage.getItem("token")
        : null;



// [ ] TODO: global error handling goes here (unauth redirects/verifies)
export const createUrqlClient = (ssrExchange: any) => ({

    url: NEXT_PUBLIC_API_URL,

    // NOTE: The fetchOptions method can accept a function or an object. 
    // We will use a function so it will be executed every time we make a fetch request, 
    // and will always send an up-to-date authentication token to the server.
    fetchOptions: () => {
        // VIP: session cookies will NOT work with AppSync AFAIK
        const token = getToken();
        return token ? { headers: { Authorization: `${token}` } } : { headers: {} };
    },
    exchanges: [
        devtoolsExchange,
        dedupExchange,
        cache,
        errorExchange,
        ssrExchange,
        fetchExchange],
})