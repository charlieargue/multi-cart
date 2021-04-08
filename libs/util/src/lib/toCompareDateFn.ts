import { Cart } from "@multi-cart/react-data-access";

export const toCompareDateFn = (a: Cart, b: Cart): number => {
    return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
}