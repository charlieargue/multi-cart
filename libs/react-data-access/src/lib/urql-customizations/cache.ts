import { Cache, cacheExchange } from '@urql/exchange-graphcache';
import {
  Account,
  AddCartLineAccountMutation,
  AddCartLineAccountMutationVariables,
  AddCartLineMutation,
  BlankCartLineMutation,
  Cart,
  CartLine,
  CartsDocument,
  CartsQuery,
  DeleteCartLineAccountMutationVariables,
  DeleteCartLineMutationVariables,
  DeleteCartMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  UpdateCartLineMutation,
  UpdateCartLineMutationVariables,
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

const invalidateAllCarts = (cache: Cache) => {
  const allFields = cache.inspectFields('Query');
  const fieldInfos = allFields.filter((info) => info.fieldName === 'carts');
  fieldInfos.forEach((fi) => {
    cache.invalidate('Query', 'carts', fi.arguments || {});
  });
};

export const cache = cacheExchange({
  keys: {
    Account: (data) => (data as Account).accountNumber,
  },
  updates: {
    Mutation: {
      blankCart: (result, args, cache) => {
        cache.updateQuery(
          { query: CartsDocument },
          (data: CartsQuery | null) => {
            (data as any).carts = [result.blankCart, ...(data as any).carts];
            return data;
          }
        );
      },

      deleteCart: (_result, args, cache, info) => {
        cache.invalidate({
          __typename: 'Cart',
          id: (args as DeleteCartMutationVariables).id,
        });
      },

      blankCartLine: (result, args, cache) => {
        cache.updateQuery(
          { query: CartsDocument },
          (data: CartsQuery | null) => {
            const foundCachedCart = (data as any).carts.find(
              (c: Cart) =>
                c.id === (result as BlankCartLineMutation).blankCartLine.cartId
            );
            foundCachedCart.cartLines.push((result as any).blankCartLine);
            return data;
          }
        );
      },

      addCartLine: (result, args, cache) => {
        cache.updateQuery(
          { query: CartsDocument },
          (data: CartsQuery | null) => {
            const foundCachedCart = (data as any).carts.find(
              (c: Cart) =>
                c.id === (result as AddCartLineMutation).addCartLine?.cartId
            );
            foundCachedCart.cartLines.push((result as any).addCartLine);
            return data;
          }
        );
      },

      deleteCartLine: (result, args, cache) => {
        cache.invalidate({
          __typename: 'CartLine',
          id: (args as DeleteCartLineMutationVariables).cartLineId,
        });
      },

      updateCartLine: (result, args, cache, info) => {
        cache.updateQuery(
          { query: CartsDocument },
          (data: CartsQuery | null) => {
            const foundCachedCart = (data as any).carts.find(
              (c: Cart) =>
                c.id ===
                (args as UpdateCartLineMutationVariables).cartLine.cartId
            );
            if (!foundCachedCart) {
              throw new Error('🔴 did not find cached cart');
            }
            foundCachedCart.cartLines = foundCachedCart.cartLines.map(
              (cl: CartLine) =>
                cl.id === (args as UpdateCartLineMutationVariables).cartLine.id
                  ? (result as UpdateCartLineMutation).updateCartLine
                  : cl
            );
            return data;
          }
        );
      },

      addCartLineAccount: (result, args, cache, info) => {
        cache.updateQuery(
          { query: CartsDocument },
          (data: CartsQuery | null | undefined) => {
            if (data) {
              const foundCachedCart = (data as any).carts.find(
                (c: Cart) =>
                  c.id === (args as AddCartLineAccountMutationVariables).cartId
              );
              if (!foundCachedCart) {
                throw new Error('🔴 did not find cached cart');
              }
              const foundCachedCartLine = foundCachedCart.cartLines.find(
                (cl: CartLine) =>
                  cl.id ===
                  (args as AddCartLineAccountMutationVariables).cartLineId
              );
              if (!foundCachedCartLine) {
                throw new Error('🔴 did not find cached cart line');
              }
              if (foundCachedCartLine.cartLineAccounts === null) {
                foundCachedCartLine.cartLineAccounts = [];
              }
              foundCachedCartLine.cartLineAccounts.push(
                (result as AddCartLineAccountMutation).addCartLineAccount
              );
              return data;
            }
          }
        );
      },

      deleteCartLineAccount: (result, args, cache) => {
        cache.invalidate({
          __typename: 'CartLineAccount',
          id: (args as DeleteCartLineAccountMutationVariables)
            .cartLineAccountId,
        });
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
        betterUpdateQuery<LoginMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.login.errors) {
              return query;
            } else {
              return {
                me: result.login.user,
              };
            }
          }
        );
        invalidateAllCarts(cache);
      },

      register: (_result, args, cache, info) => {
        betterUpdateQuery<RegisterMutation, MeQuery>(
          cache,
          { query: MeDocument },
          _result,
          (result, query) => {
            if (result.register.errors) {
              return query;
            } else {
              return {
                me: result.register.user,
              };
            }
          }
        );
      },
    },
  },
});
