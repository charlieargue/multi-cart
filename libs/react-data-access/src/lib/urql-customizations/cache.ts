import {
    Account,
    AddCartLineAccountMutation,
    AddCartLineAccountMutationVariables,
    BlankCartLineMutation,
    Cart,
    CartLine,
    CartsDocument,
    CartsQuery,
    DeleteCartLineAccountMutationVariables,
    DeleteCartLineMutationVariables,
    DeleteCartMutationVariables, LoginMutation,
    LogoutMutation,
    MeDocument,
    MeQuery,
    RegisterMutation,
    UpdateCartLineMutation,
    UpdateCartLineMutationVariables
} from "@multi-cart/react-data-access";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "./betterUpdateQuery";

const invalidateAllCarts = (cache: Cache) => {
    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter((info) => info.fieldName === "carts");
    fieldInfos.forEach((fi) => {
        cache.invalidate("Query", "carts", fi.arguments || {});
    });
}

// thx: https://formidable.com/blog/2020/normalized-cache/
export const cache = cacheExchange({

    // NOTE: resolved error:  no key could be generated for the data at this field
    keys: {
        Account: data => (data as Account).accountNumber,
    },

    resolvers: {
        Cart: {
            createdAt: (parent) => {
                const niceCreatedAt = new Date(parseInt(parent.createdAt as any));
                return niceCreatedAt.toLocaleString();
            },
            updatedAt: (parent) => {
                const niceUpdatedAt = new Date(parseInt(parent.updatedAt as any));
                return niceUpdatedAt.toLocaleString();
            }
        }
    },

    updates: {
        Mutation: {

            blankCart: (result, args, cache) => {
                cache.updateQuery({ query: CartsDocument }, (data: CartsQuery | null) => {
                    (data as any).carts = [
                        result.blankCart,
                        ...(data as any).carts
                    ];
                    return data;
                });
            },

            deleteCart: (_result, args, cache, info) => {
                // CONFUSION: MISMATCH? cuz not removing the cart from cache, its still there cart(id:780x) in the urql cache inspector (as well as cache.inspectFIelds)
                cache.invalidate({ __typename: 'Cart', id: (args as DeleteCartMutationVariables).id });
            },

            blankCartLine: (result, args, cache) => {
                cache.updateQuery({ query: CartsDocument }, (data: CartsQuery | null) => {
                    // GAMEPLAN: find our data.carts cart
                    // add this result.blankCartLine to our cart's lines
                    const foundCachedCart = (data as any).carts.find((c: Cart) => c.id === (result as BlankCartLineMutation).blankCartLine.cartId)
                    foundCachedCart.cartLines.push((result as any).blankCartLine);
                    return data;
                });
            },

            deleteCartLine: (result, args, cache) => {
                cache.invalidate({ __typename: 'CartLine', id: (args as DeleteCartLineMutationVariables).cartLineId });
                // TODO: I think this now means we can remove the cartId being passed here...
            },

            // ------------------------
            updateCartLine: (result, args, cache, info) => {
                // GAMEPLAN: find the cart in the cache data.carts
                // find the cart line in it
                // replace cart.cartLines with all old EXCEPT the UPDATED ONE
                cache.updateQuery({ query: CartsDocument }, (data: CartsQuery | null) => {
                    const foundCachedCart = (data as any).carts
                        .find((c: Cart) => c.id === (args as UpdateCartLineMutationVariables).cartLine.cartId);
                    if (!foundCachedCart) {
                        throw new Error("🔴 did not find cached cart");
                    }
                    foundCachedCart.cartLines = foundCachedCart.cartLines
                        .map((cl: CartLine) => cl.id === (args as UpdateCartLineMutationVariables).cartLine.id ?
                            (result as UpdateCartLineMutation).updateCartLine :
                            cl);
                    return data;
                });
            },

            addCartLineAccount: (result, args, cache, info) => {

                // PLURAL
                // ------------------------
                // NOTE: this needs to update the CARTS query, but CONFUSION: because this happens on the EDIT CART page?
                cache.updateQuery({ query: CartsDocument }, (data: CartsQuery | null) => {
                    if (data) {
                        // TODO: use cache.readQuery() here instead???
                        const foundCachedCart = (data as any).carts.find((c: Cart) => c.id === (args as AddCartLineAccountMutationVariables).cartId);
                        if (!foundCachedCart) {
                            throw new Error("🔴 did not find cached cart");
                        }
                        const foundCachedCartLine = foundCachedCart.cartLines.find(cl => cl.id === (args as AddCartLineAccountMutationVariables).cartLineId);
                        if (!foundCachedCartLine) {
                            throw new Error("🔴 did not find cached cart line");
                        }
                        // might be null
                        if (foundCachedCartLine.cartLineAccounts === null) {
                            foundCachedCartLine.cartLineAccounts = [];
                        }
                        foundCachedCartLine.cartLineAccounts.push((result as AddCartLineAccountMutation).addCartLineAccount);
                        return data;
                    }
                });


                // TODO: just cache.updateQuery AGAIN but this time the Cart (SINGULAR) AND IT NEEDS A VARIABLE argument! ... wait, NO -- I wasn't getting any data...
                // TODO: if that works, do I need to do both? I guess I do, there's no ENTITY that is shared/normalized.... but I thought that is what normalized cache is????
                // CONFUSION: so much, so if you do [[[[cache.updateQuery({ query: CartsDocument }, (data: CartsQuery | null) => {]]]] AGAAIN, its data comes back null!!?!?


            },

            deleteCartLineAccount: (result, args, cache) => {
                // NOTE: urql+graphe cache is smart:
                // • not only are there no explicitly cached entities for CartLineAccount (only as nested under cart -> cart lines -> ... )
                // • but! when you do this, it BOTH removes the cla from the CartQuery data AS WELL AS the CartsQuery(plural) data!!!!!
                cache.invalidate({ __typename: 'CartLineAccount', id: (args as DeleteCartLineAccountMutationVariables).cartLineAccountId });
            },

            logout: (_result, args, cache, info) => {
                betterUpdateQuery<LogoutMutation, MeQuery>(
                    cache,
                    { query: MeDocument },
                    _result,
                    () => ({ me: null })
                );
            },

            login: (_result, args, cache, info) => {
                betterUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument },
                    _result,
                    (result, query) => {
                        if (result.login.errors) {
                            return query;
                        } else {
                            return {
                                me: result.login.user
                            }
                        }
                    });
                invalidateAllCarts(cache);
            },

            register: (_result, args, cache, info) => {
                betterUpdateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument },
                    _result,
                    (result, query) => {
                        if (result.register.errors) {
                            return query;
                        } else {
                            return {
                                me: result.register.user
                            }
                        }
                    });
            },


        }
    }
});