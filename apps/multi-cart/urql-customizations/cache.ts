import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import { Account, AddCartLineAccountMutation, AddCartLineAccountMutationVariables, BlankCartLineMutation, Cart, CartDocument, CartLine, CartLineAccount, CartQuery, CartsDocument, CartsQuery, DeleteCartLineMutationVariables, DeleteCartMutationVariables, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, UpdateCartLineMutation, UpdateCartLineMutationVariables } from "@multi-cart/react-data-access";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { gql } from '@urql/core';

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

            // 💎 TODO: move to FYI

            // 🔴 WAIT??!?!?! so this isn't even needed????
            // CONFUSION: NO, this is NOT NEEDED, everything working as expected
            // ------------------------
            // ✅ ANSWER: If a mutation field's result isn't returning the full entity it updates then it becomes impossible for Graphcache to update said entity automatically
            // ✅ I guess here since we're returning the full CART LINE entity, gql updates it's cache automatically (within the Carts & Cart queries?)
            // 🧠 when I watch urql DEV TOOLS > Explorer Schema... when I ADD A LINE, it immediately BLACK SQUARE shows me the live update (in BOTH? Carts and Cart queries?)
            // 🧠  but when I change a description, it seems to be RELOADING the entire cached tree for that CART?
            // SEE https://www.loom.com/share/7c82e3080a3c4c359b65cad80a363da8 




            // ------------------------
            updateCartLine: (result, args, cache, info) => {
                // GAMEPLAN: find the cart in the cache data.carts
                // find the cart line in it
                // replace cart.cartLines with all old EXCEPT the UPDATED ONE
                cache.updateQuery({ query: CartsDocument }, (data: CartsQuery | null) => {
                    console.log("🚀 ~ data", data);
                    console.log("🚀 ~ (result as UpdateCartLineMutation).updateCartLine", (result as UpdateCartLineMutation).updateCartLine);
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
                        // console.log("💎 💎 💎 💎  ~ data", data);
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