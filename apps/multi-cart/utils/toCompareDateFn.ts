import { Cart } from "generated/graphql";

export const toCompareDateFn = (a: Cart, b: Cart): number => {
    return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
}