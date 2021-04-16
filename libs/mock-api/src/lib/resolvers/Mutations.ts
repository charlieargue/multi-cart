import { carts } from '../data/mocked-carts';
import { Cart, CartLine, CartLineInput, MutationResolvers } from '@multi-cart/react-data-access';
import * as faker from 'faker';
import { db } from '../data/setup';
import { mockNewId } from '../mockNewId';

// utility methods
const getCartIds = (): number[] => {
    return db.getData("/carts").map(c => c.id);
};

const addCart = (cart: Cart): void => {
    db.push("/carts[]", cart, true);
}

const addCartLine = (cartLine: CartLine): void => {
    // get index of this cart
    const cartIdx: number = db.getIndex("/carts", cartLine.cartId);
    // nested array push
    db.push("/carts[" + cartIdx + "]/cartLines[]", cartLine, true);
}

// ------------------------
export const mutations: MutationResolvers = {

    // ------------------------ 
    // CARTS
    // ------------------------ 

    blankCart() {
        // NOTE: tried using the /carts[-1] method but the order gets messed up and then the IDs dupe...
        const fresh: Cart = {
            id: mockNewId(getCartIds()),
            name: faker.company.companyName(),
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
            userId: 1,
            cartLines: []
        } as Cart;
        addCart(fresh);
        return fresh;
    },

    blankCartLine(_: unknown, { cartId }: { cartId: number }) {
        const cart = db
            .getData("/carts")
            .filter((cart) => cart?.id === cartId)[0];
        if (cart && cart.cartLines.length >= 0) {
            // new safe id 
            const nextId = mockNewId(getCartIds());
            console.log("🚀 ~ nextId", nextId);

            // create a new cart line
            const fresh: CartLine = {
                id: nextId,
                cartId: cartId,
                itemId: "🔵 ITEM #" + (faker as any).datatype.number(),
                description: "🔵 CL : " + new Date().toUTCString(),
                categoryId: (faker as any).datatype.number(),
                uom: (faker as any).datatype.word(),
                quantity: 1,
                price: parseFloat(faker.commerce.price()),
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString(),
            };
            console.log("🚀 ~ fresh", fresh);

            // insert into mocked data
            addCartLine(fresh);

            // return it
            return fresh;

        }
        return null;
    },

    // deleteCart(_: unknown, { id }: { id: string }) {
    //     const idx = carts.findIndex((c) => c.id === parseInt(id));
    //     if (idx !== -1) {
    //         carts.splice(idx, 1);
    //         return true;
    //     }
    //     return false;
    // },

    // deleteCartLine(_: unknown, { cartId, cartLineId }: { cartId: string, cartLineId: string }) {
    //     const findCartFn = (c: Cart): boolean => c.id === parseInt(cartId);
    //     const idx = carts
    //         .find(findCartFn)
    //         ?.cartLines.findIndex((cl) => cl!.id === parseInt(cartLineId));
    //     if (idx !== -1) {
    //         carts
    //             .find(findCartFn)
    //             ?.cartLines
    //             .splice(idx!, 1);
    //         return true;
    //     }
    //     return false;
    // },

    // updateCartLine(_: unknown, { cartLine }: { cartLine: CartLineInput }) {
    //     const cart = carts.find((c) => c.id === cartLine.cartId);
    //     if (!cart) {
    //         throw new Error("🔴 could not find cart");
    //     } else {
    //         const idx = cart.cartLines.findIndex((cl) => cl!.id === cartLine.id);
    //         // get all the old props, update with new props, and re-set in the array!
    //         cart.cartLines[idx] = {
    //             ...cart.cartLines[idx],
    //             ...(cartLine as CartLine)
    //         };
    //         // return cartLine;
    //         return cart.cartLines[idx];
    //     }
    // },


    // ------------------------ 
    // AUTHENTICATION
    // ------------------------ 


    login(_: unknown, { password, usernameOrEmail }: { password: string, usernameOrEmail: string }) {
        // see if got user
        const user = db
            .getData("/users")
            .filter((user) => usernameOrEmail.includes("@") ? user.email === usernameOrEmail : user.username === usernameOrEmail)[0];

        if (!user) {
            return {
                errors: [{
                    field: "usernameOrEmail",
                    message: "that usernameOrEmail doesn't exist"
                }],
            }
        }
        // NOTE: not salting passwords in mocked db
        if (user.password !== password) {
            return {
                errors: [{
                    field: "password",
                    message: "incorrect password"
                }]
            }
        }

        // 🟢 You are logged in!
        // DONE in pages/api/graphql.ts / HARD-CODED for now, TODO: make dynamic req.session.userId = user.id; // can be object, etc... more data in there, ...
        return {
            user
        } as const;
    },


    // TODO:
    // -----------------------    ----------------------------------------------
    // blankCartLine?: Resolver<ResolversTypes['CartLine'], ParentType, ContextType, RequireFields<MutationBlankCartLineArgs, 'cartId'>>;
    // deleteCart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCartArgs, 'id'>>;
    // deleteCartLine?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCartLineArgs, 'cartLineId' | 'cartId'>>;
    // updateCartLine?: Resolver<Maybe<ResolversTypes['CartLine']>, ParentType, ContextType, RequireFields<MutationUpdateCartLineArgs, 'cartLine'>>;
    // updateCart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationUpdateCartArgs, 'cart'>>;
    // register?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'options'>>;
    // forgotPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
    // changePassword?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'newPassword' | 'token'>>;
    // logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    // updateUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'currentCartId'>>;
    // addCartLineAccount?: Resolver<ResolversTypes['CartLineAccount'], ParentType, ContextType, RequireFields<MutationAddCartLineAccountArgs, 'amount' | 'accountNumber' | 'cartLineId' | 'cartId'>>;
    // updateCartLineAccount?: Resolver<ResolversTypes['CartLineAccount'], ParentType, ContextType, RequireFields<MutationUpdateCartLineAccountArgs, 'amount' | 'id'>>;
    // deleteCartLineAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCartLineAccountArgs, 'cartLineAccountId'>>;

};
