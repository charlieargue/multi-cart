
import { Cart, CartLine } from '@multi-cart/react-data-access';

export const carts: Cart[] = [{
    id: 1,
    name: "💎 MOCKED CART",
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
    userId: 1,
    cartLines: [
        {
            id: 1,
            cartId: 1,
            itemId: "123-EF",
            description: "sample description",
            categoryId: 1,
            uom: "EACH",
            quantity: 1,
            price: 12.65,
            createdAt: "3/11/2021",
            updatedAt: "3/11/2021",
        } as CartLine,
        {
            id: 2,
            cartId: 1,
            itemId: "678-RE",
            description: "another description",
            categoryId: 2,
            uom: "EACH",
            quantity: 1,
            price: 569.99,
            createdAt: "3/11/2021",
            updatedAt: "3/11/2021",
        } as CartLine,
    ]
} as Cart];
