// NOTE: schema.graphql (this string) is just used for the MOCKED API:
// I generate it by a) running the normal back-end, opening up the graphql playground, and then going schema > DOWNLOAD
// workaround:
export const graphqlSchema = `type Query {
    carts: [Cart!]!
    cart(id: ID!): Cart
    me: User
    accounts: [Account!]!
  }
  
  type Cart {
    id: Float!
    name: String!
    userId: ID!
    cartLines: [CartLine!]!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
  
  type CartLine {
    id: ID!
    itemId: String
    description: String
    uom: String
    quantity: Int
    categoryId: Int
    price: Float!
    cartId: ID!
    cart: Cart
    cartLineAccounts: [CartLineAccount!]
    createdAt: String!
    updatedAt: String!
  }
  
  type CartLineAccount {
    id: Float!
    amount: Float!
    accountNumber: String!
    cartLineId: Float!
    createdAt: String!
    updatedAt: String!
  }
  
  type User {
    id: Float!
    username: String!
    email: String!
    currentCartId: Int
    createdAt: String!
    updatedAt: String!
  }
  
  type Account {
    accountNumber: String!
    accountName: String!
    amountRemaining: Float!
    createdAt: String!
    updatedAt: String!
  }
  
  type Mutation {
    blankCart: Cart!
    blankCartLine(cartId: ID!): CartLine!
    deleteCart(id: ID!): Boolean!
    deleteCartLine(cartLineId: ID!, cartId: ID!): Boolean!
    updateCartLine(cartLine: CartLineInput!): CartLine
    updateCart(cart: CartInput!): Cart
    register(options: UsernamePasswordInput!): UserResponse!
    login(password: String!, usernameOrEmail: String!): UserResponse!
    forgotPassword(email: String!): Boolean!
    changePassword(newPassword: String!, token: String!): UserResponse!
    logout: Boolean!
    updateUser(currentCartId: ID!): UserResponse!
    addCartLineAccount(
      amount: Float!
      accountNumber: String!
      cartLineId: ID!
      cartId: ID!
    ): CartLineAccount!
    updateCartLineAccount(cartId: ID!, cartLineId: ID!, amount: Float!, id: ID!): CartLineAccount!
    deleteCartLineAccount(cartId: ID!, cartLineId: ID!, cartLineAccountId: ID!): Boolean!
  }
  
  input CartLineInput {
    id: ID!
    cartId: ID!
    categoryId: ID!
    quantity: ID!
    price: Float!
    itemId: String!
    description: String!
    uom: String!
  }
  
  input CartInput {
    id: ID!
    name: String!
  }
  
  type UserResponse {
    errors: [FieldError!]
    user: User
  }
  
  type FieldError {
    field: String!
    message: String!
  }
  
  input UsernamePasswordInput {
    username: String!
    email: String!
    password: String!
  }
  `;
  