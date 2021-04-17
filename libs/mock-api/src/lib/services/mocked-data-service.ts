import { Cart, CartLine, User, Account, CartLineInput, CartInput } from '@multi-cart/react-data-access';
import { db } from '../data/setup';
import { toCompareDateFn } from '@multi-cart/util';

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
}

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
}

export const updateCartLine = (cartLine: CartLineInput): CartLine => {
    const cartIdx: number = getCartIdx(cartLine.cartId);
    const cartLineIdx: number = getCartLineIdx(cartIdx, cartLine.id);
    db.push("/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]", cartLine, false); // default will override, so MERGE instead
    return db.getData("/carts[" + cartIdx + "]/cartLines[" + cartLineIdx + "]");
}

export const updateCart = (cart: CartInput): Cart => {
    // NOTE: all these have no 🛡 security, and hard-coded userId, TODO:
    const cartIdx: number = getCartIdx(cart.id);
    db.push("/carts[" + cartIdx + "]", cart, false); // default will override, so MERGE instead
    return db.getData("/carts[" + cartIdx + "]");
    // NOTE: this auto-updates in the normalized graphcache! 
}

// ------------------------ 
// ACCOUNTS
// ------------------------ 
export const getAccounts = (): Account[] => {
    return db
        .getData("/accounts")
        .sort((a, b) => a.accountName.localeCompare(b.accountName));
}

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

