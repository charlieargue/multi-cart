import { useMeQuery } from "@multi-cart/react-data-access";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useIsAuth = () => {
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();

    useEffect(() => {
        if (!fetching && !data?.me) {
            router.replace("/login?next=" + router.pathname);
        }
    }, [fetching, data, router]);
};

export default useIsAuth;