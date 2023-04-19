import { devtoolsExchange } from '@urql/devtools';
import { dedupExchange, Exchange, fetchExchange } from 'urql';
import { onPush, pipe, tap } from 'wonka';
import { actionFetchingStart, actionFetchingStop, store } from '@multi-cart/react-app-state';
import { cache } from './cache';
import debounce from 'just-debounce-it';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const errorExchange: Exchange = ({ forward }) => ops$ => {
    return pipe(
        forward(ops$),
        tap(({ error }) => {
            if (error !== undefined) {
                console.log(`🚀 ~ error`, error);
                // eg. sentry fire-and-forget
            }
        })
    );
};


// A callback that fires whenever a query or mutation is sent.
const onStart = (key: string, operationName: string) => {
    store.dispatch(actionFetchingStart);
};

// A callback that fires whenever a query or mutation has been responded to with
// data or an error. Note: this includes immediate cache hits. You may want to
// debounce your UI state changes if you're displaying a global fetching state.
const onEnd = (key: string, operationName: string) => {
    store.dispatch(actionFetchingStop);
};

// without a debounce on the onSTART, it sometimes has a "badstate" error
const debounceMs = 300; 
const debouncedOnStart = debounce(() => onStart("moot", "moot"), debounceMs);
const debouncedOnEnd = debounce(() => onEnd("moot", "moot"), debounceMs);

// thx: https://gist.github.com/earksiinni/42e842014db56253e41ca5d1437cf1a3
const globalFetchingExchange = (onStart: any, onEnd: any) => ({ client, forward }: any) => {
    return (operations$: any) => {
        const operationResult$ = forward(
            pipe(
                operations$,
                onPush((op) => {
                    const { key, kind }: any = op;
                    if (kind === 'query' || kind === 'mutation') {
                        debouncedOnStart();
                    }
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

                if ((data || error) && (kind === 'query' || kind === 'mutation')) {
                    debouncedOnEnd();

                }
            })
        );
    };
};

const getToken = () =>
    typeof window !== 'undefined'
        ? localStorage.getItem("token")
        : null;

export const createUrqlClient = (ssrExchange: any) => ({
    url: NEXT_PUBLIC_API_URL,

    // NOTE: The fetchOptions method can accept a function or an object. 
    // We will use a function so it will be executed every time we make a fetch request, 
    // and will always send an up-to-date authentication token to the server.
    fetchOptions: () => {
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