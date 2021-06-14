import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  accountNumber: Scalars['String'];
  accountName: Scalars['String'];
  amountRemaining: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  name: Scalars['String'];
  userId: Scalars['ID'];
  cartLines: Array<CartLine>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CartInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CartLine = {
  __typename?: 'CartLine';
  id: Scalars['ID'];
  itemId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  uom?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['ID']>;
  price: Scalars['Float'];
  cartId: Scalars['ID'];
  cartLineAccounts?: Maybe<Array<CartLineAccount>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CartLineAccount = {
  __typename?: 'CartLineAccount';
  id: Scalars['ID'];
  amount: Scalars['Float'];
  accountNumber: Scalars['String'];
  cartLineId: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CartLineInput = {
  id?: Maybe<Scalars['ID']>;
  cartId: Scalars['ID'];
  categoryId: Scalars['ID'];
  quantity: Scalars['Int'];
  price: Scalars['Float'];
  itemId: Scalars['String'];
  description: Scalars['String'];
  uom: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  blankCart: Cart;
  deleteCart: Scalars['Boolean'];
  blankCartLine: CartLine;
  deleteCartLine: Scalars['Boolean'];
  updateCart?: Maybe<Cart>;
  updateCartLine?: Maybe<CartLine>;
  addCartLine?: Maybe<CartLine>;
  addCartLineAccount: CartLineAccount;
  deleteCartLineAccount: Scalars['Boolean'];
  updateCartLineAccount: CartLineAccount;
  hydrateAccounts: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  forgotPassword: Scalars['Boolean'];
  changePassword?: Maybe<Scalars['Boolean']>;
  logout: Scalars['Boolean'];
  updateUser: UserResponse;
};


export type MutationDeleteCartArgs = {
  id: Scalars['ID'];
};


export type MutationBlankCartLineArgs = {
  cartId: Scalars['ID'];
};


export type MutationDeleteCartLineArgs = {
  cartLineId: Scalars['ID'];
  cartId: Scalars['ID'];
};


export type MutationUpdateCartArgs = {
  cart: CartInput;
};


export type MutationUpdateCartLineArgs = {
  cartLine: CartLineInput;
};


export type MutationAddCartLineArgs = {
  cartLine: CartLineInput;
};


export type MutationAddCartLineAccountArgs = {
  amount: Scalars['Float'];
  accountNumber: Scalars['String'];
  cartLineId: Scalars['ID'];
  cartId: Scalars['ID'];
};


export type MutationDeleteCartLineAccountArgs = {
  cartId: Scalars['ID'];
  cartLineId: Scalars['ID'];
  cartLineAccountId: Scalars['ID'];
};


export type MutationUpdateCartLineAccountArgs = {
  cartId: Scalars['ID'];
  cartLineId: Scalars['ID'];
  amount: Scalars['Float'];
  id: Scalars['ID'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  username: Scalars['String'];
  token: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  currentCartId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  cart?: Maybe<Cart>;
  carts: Array<Cart>;
  users: Array<User>;
  accounts?: Maybe<Array<Maybe<Account>>>;
  me?: Maybe<User>;
};


export type QueryCartArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  currentCartId?: Maybe<Scalars['ID']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CartLineAccountSnippetFragment = (
  { __typename?: 'CartLineAccount' }
  & Pick<CartLineAccount, 'id' | 'amount' | 'accountNumber' | 'cartLineId' | 'createdAt' | 'updatedAt'>
);

export type CartLineSnippetFragment = (
  { __typename?: 'CartLine' }
  & Pick<CartLine, 'id' | 'cartId' | 'itemId' | 'description' | 'categoryId' | 'uom' | 'quantity' | 'price' | 'createdAt' | 'updatedAt'>
  & { cartLineAccounts?: Maybe<Array<(
    { __typename?: 'CartLineAccount' }
    & CartLineAccountSnippetFragment
  )>> }
);

export type CartSnippetFragment = (
  { __typename?: 'Cart' }
  & Pick<Cart, 'id' | 'name' | 'userId' | 'createdAt' | 'updatedAt'>
  & { cartLines: Array<(
    { __typename?: 'CartLine' }
    & CartLineSnippetFragment
  )> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'currentCartId'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & Pick<UserResponse, 'token'>
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type BlankCartMutationVariables = Exact<{ [key: string]: never; }>;


export type BlankCartMutation = (
  { __typename?: 'Mutation' }
  & { blankCart: (
    { __typename?: 'Cart' }
    & CartSnippetFragment
  ) }
);

export type DeleteCartMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteCartMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCart'>
);

export type AddCartLineAccountMutationVariables = Exact<{
  cartId: Scalars['ID'];
  cartLineId: Scalars['ID'];
  accountNumber: Scalars['String'];
  amount: Scalars['Float'];
}>;


export type AddCartLineAccountMutation = (
  { __typename?: 'Mutation' }
  & { addCartLineAccount: (
    { __typename?: 'CartLineAccount' }
    & CartLineAccountSnippetFragment
  ) }
);

export type DeleteCartLineAccountMutationVariables = Exact<{
  cartId: Scalars['ID'];
  cartLineId: Scalars['ID'];
  cartLineAccountId: Scalars['ID'];
}>;


export type DeleteCartLineAccountMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCartLineAccount'>
);

export type UpdateCartLineAccountMutationVariables = Exact<{
  cartId: Scalars['ID'];
  cartLineId: Scalars['ID'];
  id: Scalars['ID'];
  amount: Scalars['Float'];
}>;


export type UpdateCartLineAccountMutation = (
  { __typename?: 'Mutation' }
  & { updateCartLineAccount: (
    { __typename?: 'CartLineAccount' }
    & Pick<CartLineAccount, 'id' | 'amount' | 'accountNumber' | 'cartLineId'>
  ) }
);

export type AddCartLineMutationVariables = Exact<{
  cartLine: CartLineInput;
}>;


export type AddCartLineMutation = (
  { __typename?: 'Mutation' }
  & { addCartLine?: Maybe<(
    { __typename?: 'CartLine' }
    & CartLineSnippetFragment
  )> }
);

export type BlankCartLineMutationVariables = Exact<{
  cartId: Scalars['ID'];
}>;


export type BlankCartLineMutation = (
  { __typename?: 'Mutation' }
  & { blankCartLine: (
    { __typename?: 'CartLine' }
    & CartLineSnippetFragment
  ) }
);

export type DeleteCartLineMutationVariables = Exact<{
  cartId: Scalars['ID'];
  cartLineId: Scalars['ID'];
}>;


export type DeleteCartLineMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCartLine'>
);

export type UpdateCartLineMutationVariables = Exact<{
  cartLine: CartLineInput;
}>;


export type UpdateCartLineMutation = (
  { __typename?: 'Mutation' }
  & { updateCartLine?: Maybe<(
    { __typename?: 'CartLine' }
    & CartLineSnippetFragment
  )> }
);

export type UpdateCartMutationVariables = Exact<{
  cart: CartInput;
}>;


export type UpdateCartMutation = (
  { __typename?: 'Mutation' }
  & { updateCart?: Maybe<(
    { __typename?: 'Cart' }
    & Pick<Cart, 'id' | 'name' | 'updatedAt'>
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  username: Scalars['String'];
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type UpdateUserMutationVariables = Exact<{
  currentCartId: Scalars['ID'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type AccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountsQuery = (
  { __typename?: 'Query' }
  & { accounts?: Maybe<Array<Maybe<(
    { __typename?: 'Account' }
    & Pick<Account, 'accountName' | 'accountNumber' | 'amountRemaining'>
  )>>> }
);

export type CartQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CartQuery = (
  { __typename?: 'Query' }
  & { cart?: Maybe<(
    { __typename?: 'Cart' }
    & CartSnippetFragment
  )> }
);

export type CartsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartsQuery = (
  { __typename?: 'Query' }
  & { carts: Array<(
    { __typename?: 'Cart' }
    & CartSnippetFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const CartLineAccountSnippetFragmentDoc = gql`
    fragment CartLineAccountSnippet on CartLineAccount {
  id
  amount
  accountNumber
  cartLineId
  createdAt
  updatedAt
}
    `;
export const CartLineSnippetFragmentDoc = gql`
    fragment CartLineSnippet on CartLine {
  id
  cartId
  itemId
  description
  categoryId
  uom
  quantity
  price
  cartLineAccounts {
    ...CartLineAccountSnippet
  }
  createdAt
  updatedAt
}
    ${CartLineAccountSnippetFragmentDoc}`;
export const CartSnippetFragmentDoc = gql`
    fragment CartSnippet on Cart {
  id
  name
  userId
  cartLines {
    ...CartLineSnippet
  }
  createdAt
  updatedAt
}
    ${CartLineSnippetFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  currentCartId
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
  token
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const BlankCartDocument = gql`
    mutation BlankCart {
  blankCart {
    ...CartSnippet
  }
}
    ${CartSnippetFragmentDoc}`;

export function useBlankCartMutation() {
  return Urql.useMutation<BlankCartMutation, BlankCartMutationVariables>(BlankCartDocument);
};
export const DeleteCartDocument = gql`
    mutation DeleteCart($id: ID!) {
  deleteCart(id: $id)
}
    `;

export function useDeleteCartMutation() {
  return Urql.useMutation<DeleteCartMutation, DeleteCartMutationVariables>(DeleteCartDocument);
};
export const AddCartLineAccountDocument = gql`
    mutation AddCartLineAccount($cartId: ID!, $cartLineId: ID!, $accountNumber: String!, $amount: Float!) {
  addCartLineAccount(
    cartId: $cartId
    cartLineId: $cartLineId
    accountNumber: $accountNumber
    amount: $amount
  ) {
    ...CartLineAccountSnippet
  }
}
    ${CartLineAccountSnippetFragmentDoc}`;

export function useAddCartLineAccountMutation() {
  return Urql.useMutation<AddCartLineAccountMutation, AddCartLineAccountMutationVariables>(AddCartLineAccountDocument);
};
export const DeleteCartLineAccountDocument = gql`
    mutation DeleteCartLineAccount($cartId: ID!, $cartLineId: ID!, $cartLineAccountId: ID!) {
  deleteCartLineAccount(
    cartId: $cartId
    cartLineId: $cartLineId
    cartLineAccountId: $cartLineAccountId
  )
}
    `;

export function useDeleteCartLineAccountMutation() {
  return Urql.useMutation<DeleteCartLineAccountMutation, DeleteCartLineAccountMutationVariables>(DeleteCartLineAccountDocument);
};
export const UpdateCartLineAccountDocument = gql`
    mutation UpdateCartLineAccount($cartId: ID!, $cartLineId: ID!, $id: ID!, $amount: Float!) {
  updateCartLineAccount(
    cartId: $cartId
    cartLineId: $cartLineId
    id: $id
    amount: $amount
  ) {
    id
    amount
    accountNumber
    cartLineId
  }
}
    `;

export function useUpdateCartLineAccountMutation() {
  return Urql.useMutation<UpdateCartLineAccountMutation, UpdateCartLineAccountMutationVariables>(UpdateCartLineAccountDocument);
};
export const AddCartLineDocument = gql`
    mutation AddCartLine($cartLine: CartLineInput!) {
  addCartLine(cartLine: $cartLine) {
    ...CartLineSnippet
  }
}
    ${CartLineSnippetFragmentDoc}`;

export function useAddCartLineMutation() {
  return Urql.useMutation<AddCartLineMutation, AddCartLineMutationVariables>(AddCartLineDocument);
};
export const BlankCartLineDocument = gql`
    mutation BlankCartLine($cartId: ID!) {
  blankCartLine(cartId: $cartId) {
    ...CartLineSnippet
  }
}
    ${CartLineSnippetFragmentDoc}`;

export function useBlankCartLineMutation() {
  return Urql.useMutation<BlankCartLineMutation, BlankCartLineMutationVariables>(BlankCartLineDocument);
};
export const DeleteCartLineDocument = gql`
    mutation DeleteCartLine($cartId: ID!, $cartLineId: ID!) {
  deleteCartLine(cartId: $cartId, cartLineId: $cartLineId)
}
    `;

export function useDeleteCartLineMutation() {
  return Urql.useMutation<DeleteCartLineMutation, DeleteCartLineMutationVariables>(DeleteCartLineDocument);
};
export const UpdateCartLineDocument = gql`
    mutation UpdateCartLine($cartLine: CartLineInput!) {
  updateCartLine(cartLine: $cartLine) {
    ...CartLineSnippet
  }
}
    ${CartLineSnippetFragmentDoc}`;

export function useUpdateCartLineMutation() {
  return Urql.useMutation<UpdateCartLineMutation, UpdateCartLineMutationVariables>(UpdateCartLineDocument);
};
export const UpdateCartDocument = gql`
    mutation UpdateCart($cart: CartInput!) {
  updateCart(cart: $cart) {
    id
    name
    updatedAt
  }
}
    `;

export function useUpdateCartMutation() {
  return Urql.useMutation<UpdateCartMutation, UpdateCartMutationVariables>(UpdateCartDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($username: String!, $token: String!, $newPassword: String!) {
  changePassword(username: $username, token: $token, newPassword: $newPassword)
}
    `;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($currentCartId: ID!) {
  updateUser(currentCartId: $currentCartId) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const AccountsDocument = gql`
    query Accounts {
  accounts {
    accountName
    accountNumber
    amountRemaining
  }
}
    `;

export function useAccountsQuery(options: Omit<Urql.UseQueryArgs<AccountsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AccountsQuery>({ query: AccountsDocument, ...options });
};
export const CartDocument = gql`
    query Cart($id: ID!) {
  cart(id: $id) {
    ...CartSnippet
  }
}
    ${CartSnippetFragmentDoc}`;

export function useCartQuery(options: Omit<Urql.UseQueryArgs<CartQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CartQuery>({ query: CartDocument, ...options });
};
export const CartsDocument = gql`
    query Carts {
  carts {
    ...CartSnippet
  }
}
    ${CartSnippetFragmentDoc}`;

export function useCartsQuery(options: Omit<Urql.UseQueryArgs<CartsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CartsQuery>({ query: CartsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Cart: ResolverTypeWrapper<Cart>;
  CartInput: CartInput;
  CartLine: ResolverTypeWrapper<CartLine>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CartLineAccount: ResolverTypeWrapper<CartLineAccount>;
  CartLineInput: CartLineInput;
  FieldError: ResolverTypeWrapper<FieldError>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UsernamePasswordInput: UsernamePasswordInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Float: Scalars['Float'];
  Cart: Cart;
  CartInput: CartInput;
  CartLine: CartLine;
  Int: Scalars['Int'];
  CartLineAccount: CartLineAccount;
  CartLineInput: CartLineInput;
  FieldError: FieldError;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  Query: {};
  User: User;
  UserResponse: UserResponse;
  UsernamePasswordInput: UsernamePasswordInput;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  accountNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accountName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amountRemaining?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cart'] = ResolversParentTypes['Cart']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cartLines?: Resolver<Array<ResolversTypes['CartLine']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLineResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartLine'] = ResolversParentTypes['CartLine']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  itemId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uom?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  cartId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cartLineAccounts?: Resolver<Maybe<Array<ResolversTypes['CartLineAccount']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartLineAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['CartLineAccount'] = ResolversParentTypes['CartLineAccount']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  accountNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cartLineId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FieldErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['FieldError'] = ResolversParentTypes['FieldError']> = {
  field?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  blankCart?: Resolver<ResolversTypes['Cart'], ParentType, ContextType>;
  deleteCart?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCartArgs, 'id'>>;
  blankCartLine?: Resolver<ResolversTypes['CartLine'], ParentType, ContextType, RequireFields<MutationBlankCartLineArgs, 'cartId'>>;
  deleteCartLine?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCartLineArgs, 'cartLineId' | 'cartId'>>;
  updateCart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<MutationUpdateCartArgs, 'cart'>>;
  updateCartLine?: Resolver<Maybe<ResolversTypes['CartLine']>, ParentType, ContextType, RequireFields<MutationUpdateCartLineArgs, 'cartLine'>>;
  addCartLine?: Resolver<Maybe<ResolversTypes['CartLine']>, ParentType, ContextType, RequireFields<MutationAddCartLineArgs, 'cartLine'>>;
  addCartLineAccount?: Resolver<ResolversTypes['CartLineAccount'], ParentType, ContextType, RequireFields<MutationAddCartLineAccountArgs, 'amount' | 'accountNumber' | 'cartLineId' | 'cartId'>>;
  deleteCartLineAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCartLineAccountArgs, 'cartId' | 'cartLineId' | 'cartLineAccountId'>>;
  updateCartLineAccount?: Resolver<ResolversTypes['CartLineAccount'], ParentType, ContextType, RequireFields<MutationUpdateCartLineAccountArgs, 'cartId' | 'cartLineId' | 'amount' | 'id'>>;
  hydrateAccounts?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'options'>>;
  login?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'usernameOrEmail'>>;
  forgotPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'username' | 'token' | 'newPassword'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updateUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'currentCartId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType, RequireFields<QueryCartArgs, 'id'>>;
  carts?: Resolver<Array<ResolversTypes['Cart']>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Account']>>>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currentCartId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['FieldError']>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  CartLine?: CartLineResolvers<ContextType>;
  CartLineAccount?: CartLineAccountResolvers<ContextType>;
  FieldError?: FieldErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
