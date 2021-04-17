import { Cart, CartLine, MutationResolvers, User } from '@multi-cart/react-data-access';
import * as faker from 'faker';
import { db } from '../data/setup';
import { mockNewId } from '../mockNewId';
import { addCart, addCartLine, deleteCart, deleteCartLine, getCart, getCartIds, getCartLineIds, updateCurrentCart } from '../services/mocked-data-service';


// ------------------------
export const mutations: MutationResolvers = {

    // ------------------------ 
    // CARTS
    // ------------------------ 

    blankCart() {
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
        const cart = getCart(cartId);
        if (cart && cart.cartLines.length >= 0) {
            // new safe id 
            const nextId = mockNewId(getCartLineIds(cartId));
            console.log("🚀 ~ nextId", nextId);

            // create a new cart line
            const fresh: CartLine = {
                id: nextId,
                cartId: cartId,
                itemId: "🔵 ITEM #" + faker.random.number(),
                description: "🔵 CL : " + new Date().toUTCString(),
                categoryId: faker.random.number(),
                uom: faker.random.word(),
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

    deleteCart(_: unknown, { id }: { id: number }) {
        return deleteCart(id);
    },

    deleteCartLine(_: unknown, { cartId, cartLineId }: { cartId: number, cartLineId: number }) {
        return deleteCartLine(cartId, cartLineId);
    },

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
    // USERs
    // ------------------------ 

    updateUser(_: unknown, { currentCartId }: { currentCartId: number }) {
        // TODO: hacky: hard-coded 1 userId because not sure how to set session in this mocked context... yet...
        const updatedUser: User = updateCurrentCart(1, currentCartId);
        console.log(`🚀 ~ updatedUser`, updatedUser);
        return {
            user: updatedUser
        };
    },

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
