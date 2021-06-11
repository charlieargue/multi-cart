import { useMeQuery } from "@multi-cart/react-data-access";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

type Action = { type: 'replace' }

export const useIsAuth = () => {
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();

    // NOTE: using useReducer in order to NOT have entire router in effect dep array
    const initialState = undefined;
    const reducer = (state: string, action: Action) => {
        if (action.type === "replace") {
            router.replace("/login?next=" + router.asPath);
            return state; //hacky? not really using this state (yet)
        } else {
            throw new Error();
        }
    }
    const [, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!fetching && !data?.me) {
            dispatch({ type: "replace" });
        }
    }, [fetching, data,]);
};