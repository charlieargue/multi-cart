import { Cart, CartInput, CartLine, CartLineAccount, CartLineInput, MutationResolvers, User, UsernamePasswordInput } from '@multi-cart/react-data-access';
import * as faker from 'faker';
import { mockNewId } from '../mockNewId';
import { addCart, addCartLine, addCartLineAccount, deleteCart, deleteCartLine, forgotPassword, getCart, getCartIds, getCartLineAccountIds, getCartLineIds, loginUser, registerUser, updateCart, updateCartLine, updateCartLineAccount, updateCurrentCart } from '../services/mocked-data-service';
import { validateRegister } from '@multi-cart/util';

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

            // create a new cart line
            const fresh: CartLine = {
                id: nextId,
                cartId: cartId,
                itemId: "",
                description: "",
                categoryId: 1,
                uom: "EACH",
                quantity: 1,
                cartLineAccounts: [],
                price: 0,
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString(),
            };

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

    updateCartLine(_: unknown, { cartLine }: { cartLine: CartLineInput }) {
        return updateCartLine(cartLine);
    },

    updateCart(_: unknown, { cart }: { cart: CartInput }) {
        return updateCart(cart);
    },

    // ------------------------ 
    // LINE ACCOUNTS (for carts)
    // ------------------------ 
    addCartLineAccount(_: unknown, { cartId, cartLineId, accountNumber, amount }: { cartId: number, cartLineId: number, accountNumber: string, amount: number }) {
        const fresh: CartLineAccount = {
            id: mockNewId(getCartLineAccountIds(cartId, cartLineId)),
            amount,
            accountNumber,
            cartLineId,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        } as CartLineAccount;
        return addCartLineAccount(cartId, fresh);
    },

    updateCartLineAccount(_: unknown, { cartId, cartLineId, amount, id }: { cartId: number, cartLineId: number, amount: number, id: number }) {
        return updateCartLineAccount(cartId, cartLineId, amount, id);
    },



    // ------------------------ 
    // USERs
    // ------------------------ 

    updateUser(_: unknown, { currentCartId }: { currentCartId: number }) {
        // TODO: hacky: hard-coded 1 userId because not sure how to set session in this mocked context... yet...
        const updatedUser: User = updateCurrentCart(1, currentCartId);
        return {
            user: updatedUser
        };
    },

    // ------------------------ 
    // AUTHENTICATION
    // ------------------------ 


    login(_: unknown, { password, usernameOrEmail }: { password: string, usernameOrEmail: string }) {
        // see if got user
        const user = loginUser(password, usernameOrEmail);

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


    register(_: unknown, { options }: { options: UsernamePasswordInput }) {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }
        return registerUser(options);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    forgotPassword(_: unknown, { email }: { email: string }) {
        return forgotPassword(/*email*/);
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changePassword(_: unknown, { token, newPassword }: { token: string, newPassword: string, }) {
        return {
            errors: [{
                field: "password",
                message: "change password workflow is not allowed in MOCKED API, sorry... work-in-progress"
            }]
        };
    },


    logout() {
        // TODO: mocked session, see real resolver
        return true;
    },


    // TODO:
    // -----------------------    ----------------------------------------------
    // deleteCartLineAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCartLineAccountArgs, 'cartLineAccountId'>>;

};
