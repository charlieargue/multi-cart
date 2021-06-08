import { useMeQuery } from "@multi-cart/react-data-access";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import 'regenerator-runtime/runtime';

type Action = { type: 'replace', path: string }

export const useIsAuth = () => {
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();

    // NOTE: using useReducer in order to NOT have entire router in effect dep array
    const initialState = undefined;
    const reducer = (_: string, action: Action) => {
        if (action.type === "replace") {
            router.replace("/login?next=" + action.path);
            return action.path;
        } else {
            throw new Error();
        }
    }
    const [, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!fetching && !data?.me) {
            dispatch({ type: "replace", path: router.pathname });
        }
    }, [fetching, data, router.pathname]);
};