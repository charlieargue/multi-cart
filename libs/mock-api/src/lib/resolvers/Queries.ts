import { QueryResolvers } from '@multi-cart/react-data-access';
import { toCompareDateFn } from '@multi-cart/util';
import { db } from '../data/setup';


export const queries: QueryResolvers = {

    carts() {
        return db
            .getData("/carts")
            .sort((a, b) => toCompareDateFn(a, b));
    },

    cart(_: unknown, { id }: { id: number }) {
        return db
            .getData("/carts")
            .filter((cart) => cart?.id === id)[0];
    },

    me() {
        // TODO: TBD how to session with mocked api?
        return db
            .getData("/users")
            .filter((user) => user?.id === 1)[0]; // TODO:
    },

};
