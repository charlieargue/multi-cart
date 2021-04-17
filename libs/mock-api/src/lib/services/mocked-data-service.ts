import { Account, Cart, CartInput, CartLine, CartLineAccount, CartLineInput, User, UsernamePasswordInput, UserResponse } from '@multi-cart/react-data-access';
import { toCompareDateFn } from '@multi-cart/util';
import { db } from '../data/setup';

// ------------------------ 
// CARTS
// ------------------------ 

export const getCartIds = (): number[] => {
    return db.getData("/carts").map(c => c.id);
};

export const getCartLineIds = (cartId: number): number[] => {
    const cart: Cart = getCart(cartId);
    return cart.cartLines.map(c => c.id);
};

export const getCartLineAccountIds = (cartId: number, cartLineId: number): number[] => {
    const cart: Cart = getCart(cartId);
    const foundCartLine: CartLine = cart.cartLines.find(cl => cl.id === cartLineId);
    return (foundCartLine.cartLineAccounts || []).map(cla => cla.id);
};

export const addCart = (cart: Cart): void => {
    db.push("/carts[]", cart, true);
};

export const addCartLine = (cartLine: CartLine): void => {
    // get index of this cart
    const cartIdx: number = getCartIdx(cartLine.cartId);

    // nested array push
    db.push("/carts[" + cartIdx + "]/cartLines[]", cartLine, true);
};

export const getCartIdx = (cartId: number): number => {
    return db.getIndex("/carts", cartId);
};

// ATTN: ones an idx and one's an id
export const getCartLineIdx = (cartIdx: number, cartLineId: number): number => {
    return db.getIndex("/carts[" + cartIdx + "]/cartLines", cartLineId);
};

// ATTN: two are idx and one's an id
export const getCartLineAccountIdx = (cartIdx: number, cartLineIdx: number, cartLineAccountId: number): number => {
    return db.getIndex("/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]/cartLineAccounts", cartLineAccountId);
};

export const getCart = (id: number): Cart => {
    const idx: number = getCartIdx(id);
    return db
        .getData("/carts[" + idx + "]");
};

export const getCarts = (): Cart[] => {
    return db
        .getData("/carts")
        .sort((a, b) => toCompareDateFn(a, b));
};

export const deleteCart = (id: number): boolean => {
    try {
        const cartIdx: number = getCartIdx(id);
        db.delete("/carts[" + cartIdx + "]");
        updateCurrentCart(1, undefined); // TODO: undefined? or null... real resolver has null.. also, hacky: 1 hard-coded
        return true;
    } catch (error) {
        console.log(`🚀 ~ error deleteCart`, error);
        return false;
    }
};

export const deleteCartLine = (cartId: number, cartLineId: number): boolean => {
    try {
        const cartIdx: number = getCartIdx(cartId);
        const cartLineIdx: number = getCartLineIdx(cartIdx, cartLineId);
        db.delete("/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]");
        return true;
    } catch (error) {
        console.log(`🚀 ~ error deleteCartLine: `, error);
        return false;
    }
};

export const updateCartLine = (cartLine: CartLineInput): CartLine => {
    const cartIdx: number = getCartIdx(cartLine.cartId);
    const cartLineIdx: number = getCartLineIdx(cartIdx, cartLine.id);
    db.push("/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]", cartLine, false); // default will override, so MERGE instead
    return db.getData("/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]");
};

export const updateCart = (cart: CartInput): Cart => {
    // NOTE: all these have no 🛡 security, and hard-coded userId, TODO:
    const cartIdx: number = getCartIdx(cart.id);
    db.push("/carts[" + cartIdx + "]", cart, false); // default will override, so MERGE instead
    return db.getData("/carts[" + cartIdx + "]");
    // NOTE: this auto-updates in the normalized graphcache! 
};

// ------------------------ 
// ACCOUNTS
// ------------------------ 
export const getAccounts = (): Account[] => {
    return db
        .getData("/accounts")
        .sort((a, b) => a.accountName.localeCompare(b.accountName));
};


export const addCartLineAccount = (cartId: number, fresh: CartLineAccount): CartLineAccount => {
    // TODO: hacky, hard-coded for userId 1
    // SKIPPING:
    //         where: {
    //             userId: req.session.userId,
    //         }

    try {
        // SKIPPING: make sure this cartLine EXISTS AND belongs to currently-logged-in user
        // make sure the account number exists AND has remaining funds!
        // insert new record into CLA
        const foundAccount = getAccounts().find(a => a.accountNumber === fresh.accountNumber);
        const foundCart = getCart(cartId);
        const foundCartLine = foundCart.cartLines.find(cl => cl.id === fresh.cartLineId);
        if (foundCart && foundCartLine && foundAccount) {
            const hasSufficientFunds: boolean = (foundAccount.amountRemaining - fresh.amount > 0);
            if (!hasSufficientFunds) {
                throw new Error(`Insufficient Account Funds: FUND: ${foundAccount.accountNumber}, NAME: ${foundAccount.accountName}, REQUEST AMOUNT: $${fresh.amount}, REMAINING: $${foundAccount.amountRemaining}`);
            }
            const cartIdx: number = getCartIdx(cartId);
            const cartLineIdx: number = getCartLineIdx(cartIdx, fresh.cartLineId);

            // nested.nested array push
            db.push(
                "/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]",
                fresh,
                true);

            // cheating here..., not actually pulling from "db"
            return fresh;

        }
    } catch (err) {
        //     console.log("🔴 ~ err", err)
        //     // TODO: this needs to return a RegularResponse with errors in it, like RegularUserResponse
    }
    // return new Error('🔴 could not create CART LINE ACCOUNT');
};


export const updateCartLineAccount = (amount: number, id: number): CartLineAccount => {
    try {
        // SKIPPING
        //     // make sure this cartLine EXISTS AND belongs to currently-logged-in user
        //     // make sure the account number exists AND has remaining funds!
        //     // insert new record into CLA
        //     // NOTE: if I had added the  

        // hmmm, given just a cla id, we have no normalized data (why didn't we create a /lineaccounts again? ... because then we'd have to fake all the JOINS in the mocked responses!)
        // TODO: go thru each cart, and it's cart lines, searching for THIS cart line account ID! fun!
        // nested for() loops and BREAK OUT WHEN FOUND!
        let foundCartLineAccount: CartLineAccount;
        let foundCartLine: CartLine;
        let foundCart: Cart;
        const carts: Cart[] = getCarts();
        console.log(`🚀 ~ carts`, carts);
        for (let c = 0; c < carts.length; c++) {
            for (let cl = 0; cl < carts[c].cartLines.length; cl++) {

                const foundCLA: CartLineAccount = carts[c].cartLines[cl].cartLineAccounts.find(cla => cla.id === id);
                console.log(`🚀 ~ foundCLA`, foundCLA);
                if (foundCLA) {
                    foundCartLineAccount = foundCLA;
                    foundCartLine = carts[c].cartLines[cl];
                    foundCart = carts[c];
                    break;
                }
            }
        }
        // NOTE: can assume will CLA exists
        if (!foundCartLineAccount) {
            throw new Error("🔴 ERROR: did not find mock data cart line account");
        }

        const cartIdx: number = getCartIdx(foundCart.id);
        const cartLineIdx: number = getCartLineIdx(cartIdx, foundCartLine.id);
        const cartLineAccountIdx: number = getCartLineAccountIdx(cartIdx, cartLineIdx, foundCartLineAccount.id);
        db.push("/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]/cartLineAccounts", {
            amount,
            id
        }, false); // default will override, so MERGE instead
        return db.getData("/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]/cartLineAccounts[" + cartLineAccountIdx + "]");
    } catch (err) {
        console.log("🔴 ~ updateCartLineAccount err: ", err)
        // TODO: this needs to return a RegularResponse with errors in it, like RegularUserResponse
    }
}

// ------------------------ 
// AUTHENTICATION
// ------------------------ 
export const loginUser = (password: string, usernameOrEmail: string) => {
    return db
        .getData("/users")
        .filter((user) => usernameOrEmail.includes("@") ? user.email === usernameOrEmail : user.username === usernameOrEmail)[0];
};

export const registerUser = (options: UsernamePasswordInput) => {

    return {
        errors: [{
            field: "username",
            message: "registration is not allowed in MOCKED API, sorry... work-in-progress"
        }]
    };

    // LOGIN MOCK up above...
    // ------------------------
    // return 

    // SKIPPING:
    // • const hashedPassword = await argon2.hash(options.password); AND //  to the db.push() password: hashedPassword
    // • dupe checks against email/username, etc...
    // TODO: finish this once get session MOCKED!
    // TODO: need to mockNewId and options.id = ...
    // + createdAt dates? see blankCart
    // db.push("/users[]", options, false);
    // now fetch this new user from db.getUser()...


    // SKIPPING:
    //     if (err.code === "23505" || err.detail.includes("already exists")) {
    //         return {
    //             errors: [{
    //                 field: "username",
    //                 message: "username has already been taken"
    //             }]
    //         };
    //     }
    // }

    // SKIPPING:
    // // 🟢 You are logged in! (store user id in session, setting a cookie, keeping them logged in...)
    // req.session.userId = user.id;

    // return { user };
    // // ✅ graphql will NOT return the .password field, FYI
};

export const forgotPassword = (): boolean => {
    // TODO: if you abstracted the data calls AND session calls in the REAL RESOLVERS, you could re-use code and have the "controller" logic (make a token, set a redis key, etc..) not duplicated!
    console.log("😩 forgot password workflow is not allowed in MOCKED API, sorry... work-in-progress");
    return false;
    // see REAL RESOLVER

};
// ------------------------ 
// USERs
// ------------------------ 

export const getUserIdx = (userId: number): number => {
    return db.getIndex("/users", userId);
};

export const getUser = (id: number): User => {
    const idx: number = getUserIdx(id);
    return db
        .getData("/users[" + idx + "]");
};



export const updateCurrentCart = (userId: number, cartId: number | undefined): User => {
    const idx: number = getUserIdx(userId);
    db.push("/users[" + idx + "]/currentCartId", cartId, false); // default will override, so MERGE instead
    return db
        .getData("/users[" + idx + "]");
}

