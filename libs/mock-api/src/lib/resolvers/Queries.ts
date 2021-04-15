
// assume these are all THIS user's carts!
import { carts } from '../data/mocked-carts';
import { QueryResolvers } from '@multi-cart/react-data-access';
import { toCompareDateFn } from '@multi-cart/util';

export const queries: QueryResolvers = {

    carts() {
        return carts
            .sort((a, b) => toCompareDateFn(a, b));
    },
    // cart(_: unknown, { id }: { id: string }) {
    //     return carts
    //         .filter((cart) => cart?.id.toString() === id)[0];
    // },

};

