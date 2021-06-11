// NOTE: moved here from data-access project since needed window.localstorage!
// - https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#nextjs
import { devtoolsExchange } from '@urql/devtools';
import { dedupExchange, Exchange, fetchExchange } from 'urql';
import { onPush, pipe, tap } from 'wonka'; // part of urql!
import { cache } from './cache';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// TODO: ditto for devtools
// thx: https://github.com/FormidableLabs/urql/issues/225
// BEN 6:15:38
const errorExchange: Exchange = ({ forward }) => ops$ => {

    // streams are back! 
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            if (error !== undefined) {
                console.log(`🚀 ~ error`, error);

                // TODO: anytime there's an error in anything we run..
                // 🛡 sentry fire-and-forget CALL would go here!

                // can't use HOOKS here, so can't use useToast
            }
        })
    );
};


// -------------------
// -------------------
// -------------------
// -------------------
// -------------------
// -------------------
// -------------------
let inflightCount = 0;

// A callback that fires whenever a query or mutation is sent.
const onStart = (key: string, operationName: string) => {
    inflightCount += 1;
    // operationName: the type of operation (query or mutation)
    // key: a unique internal identifier used by urql to track the operation
    console.log(`🟢 ${operationName} op ${key} send: ${inflightCount} ops in-flight`);
};

// A callback that fires whenever a query or mutation has been responded to with
// data or an error. Note: this includes immediate cache hits. You may want to
// debounce your UI state changes if you're displaying a global fetching state.
const onEnd = (key: string, operationName: string) => {
    inflightCount -= 1;
    console.log(`🔴 ${operationName} op ${key} receive: ${inflightCount} ops in-flight`);
};

// thx: https://gist.github.com/earksiinni/42e842014db56253e41ca5d1437cf1a3
const globalFetchingExchange = (onStart: any, onEnd: any) => ({ client, forward }: any) => {
    return (operations$: any) => {
        const operationResult$ = forward(
            pipe(
                operations$,
                onPush((op) => {
                    const { key, kind }: any = op;
                    if (kind === 'query' || kind === 'mutation')
                        onStart(key, kind);
                })
            )
        );

        return pipe(
            operationResult$,
            onPush((op) => {
                const {
                    data,
                    error,
                    operation: { key, kind },
                }: any = op;

                if ((data || error) && (kind === 'query' || kind === 'mutation'))
                    onEnd(key, kind);
            })
        );
    };
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
        // NOTE: we only need x-api-key when we are calling login/register
        const token = getToken();
        return token ?
            { headers: { Authorization: `${token}` } } :
            { headers: { "x-api-key": NEXT_PUBLIC_API_KEY } };
    },
    exchanges: [
        devtoolsExchange,
        dedupExchange,
        cache,
        errorExchange,
        ssrExchange,
        globalFetchingExchange(onStart, onEnd),
        fetchExchange],
})