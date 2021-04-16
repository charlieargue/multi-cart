import { useMeQuery } from "@multi-cart/react-data-access";
import { useRouter } from "next/router";
import { useEffect } from "react";
import 'regenerator-runtime/runtime';

export const useIsAuth = () => {
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (!fetching && !data?.me) {
            router.replace("/login?next=" + router.pathname);
        }
    }, [fetching, data, router]);
};