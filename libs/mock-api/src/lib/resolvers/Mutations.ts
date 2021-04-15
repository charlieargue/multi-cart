import { carts } from '../data/mocked-carts';
import { Cart, CartLine, CartLineInput, MutationResolvers } from '@multi-cart/react-data-access';
// import { mockNewId } from '../mockNewId';
// import faker from 'faker';


export const mutations: MutationResolvers = {

    blankCart() {
        // create a new cart
        const fresh: Cart = {
            id: carts.length + 1,
            name: "🔴 " + new Date().toUTCString(),
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
            userId: 1,
            cartLines: []
        } as Cart;
        // insert into mocked data
        carts.push(fresh);

        // return it
        return fresh;
    },

    // TODO: change all these inputs to Ints/numbers dummy!
    // blankCartLine(_: unknown, { cartId }: { cartId: string }) {
    //     const nCartId = parseInt(cartId);
    //     const cart = carts.find((c) => c.id === nCartId);
    //     if (cart && cart.cartLines.length >= 0) {
    //         // new safe id 
    //         const nextId = mockNewId(cart.cartLines.map((cl) => (cl as any).id));
    //         console.log("🚀 ~ nextId", nextId);

    //         // create a new cart line
    //         const fresh: CartLine = {
    //             id: nextId,
    //             cartId: nCartId,
    //             itemId: "🔵 ITEM #" + faker.random.number(),
    //             description: "🔵 CL : " + new Date().toUTCString(),
    //             categoryId: faker.random.number(),
    //             uom: faker.random.word(),
    //             quantity: 1,
    //             price: parseFloat(faker.commerce.price()),
    //             createdAt: new Date().toLocaleString(),
    //             updatedAt: new Date().toLocaleString(),
    //         };
    //         console.log("🚀 ~ fresh", fresh);
    //         // insert into mocked data
    //         cart.cartLines.push(fresh);

    //         // return it
    //         return fresh;

    //     }
    //     return null;
    // },

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

    updateCartLine(_: unknown, { cartLine }: { cartLine: CartLineInput }) {
        const cart = carts.find((c) => c.id === cartLine.cartId);
        if (!cart) {
            throw new Error("🔴 could not find cart");
        } else {
            const idx = cart.cartLines.findIndex((cl) => cl!.id === cartLine.id);
            // get all the old props, update with new props, and re-set in the array!
            cart.cartLines[idx] = {
                ...cart.cartLines[idx],
                ...(cartLine as CartLine)
            };
            // return cartLine;
            return cart.cartLines[idx];
        }
    },
};
