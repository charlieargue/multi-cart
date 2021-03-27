import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import { BlankCartLineMutation, Cart, CartLine, CartsDocument, CartsQuery, DeleteCartLineMutationVariables, DeleteCartMutationVariables, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, UpdateCartLineMutation, UpdateCartLineMutationVariables } from "@multi-cart/react-data-access";
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
                cache.updateQuery({ query: CartsDocument }, (data: CartsQuery | null) => {
                    // GAMEPLAN: find our data.carts cart USING ARGS
                    // delete that cart's line!
                    const foundCachedCart = (data as any).carts.find((c: Cart) => c.id === (args as DeleteCartLineMutationVariables).cartId)
                    const idx = foundCachedCart.cartLines.findIndex((cl: CartLine) => cl.id === (args as DeleteCartLineMutationVariables).cartLineId)
                    if (idx !== -1) {
                        foundCachedCart.cartLines.splice(idx, 1);
                    }
                    return data;
                });

            },

            updateCartLine: (result, args, cache, info) => {
                // GAMEPLAN: find the cart in the cache data.carts
                // find the cart line in it
                // replace cart.cartLines with all old EXCEPT the UPDATED ONE
                cache.updateQuery({ query: CartsDocument }, (data: CartsQuery | null) => {
                    const foundCachedCart = (data as any).carts
                        .find((c: Cart) => c.id === (args as UpdateCartLineMutationVariables).cartLine.cartId)
                    if (!foundCachedCart) {
                        throw new Error("🔴 did not find cached cart");
                    }
                    foundCachedCart.cartLines = foundCachedCart.cartLines
                        .map((cl: CartLine) => cl.id === (args as UpdateCartLineMutationVariables).cartLine.id ? (result as UpdateCartLineMutation).updateCartLine : cl);
                    return data;
                });
            },

            // -------------------
            logout: (_result, args, cache, info) => {
                betterUpdateQuery<LogoutMutation, MeQuery>(
                    cache,
                    { query: MeDocument },
                    _result,
                    () => ({ me: null })
                );
            },

            // -------------------
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