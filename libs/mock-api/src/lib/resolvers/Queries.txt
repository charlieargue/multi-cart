import { QueryResolvers } from '@multi-cart/react-data-access';
import { getAccounts, getCart, getCarts, getUser } from '../services/mocked-data-service';


export const queries: QueryResolvers = {

    carts() {
        return getCarts();
    },

    cart(_: unknown, { id }: { id: number }) {
        return getCart(id);
    },

    me() {
        // TODO: TBD how to session with mocked api? hacky: hardcoded 1 for userId
        return getUser(1);
    },

    accounts() {
        return getAccounts();
    },

};
