// NOTE: schema.graphql (this string) is just used for the MOCKED API:
// I generate it by a) running the normal back-end, opening up the graphql playground, and then going schema > DOWNLOAD
// workaround:
export const graphqlSchema = `type Query {
    carts: [Cart!]!
    cart(id: Int!): Cart
    me: User
    accounts: [Account!]!
  }
  
  type Cart {
    id: Float!
    name: String!
    userId: Int!
    cartLines: [CartLine!]!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
  
  type CartLine {
    id: Int!
    itemId: String
    description: String
    uom: String
    quantity: Int
    categoryId: Int
    price: Float!
    cartId: Int!
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
    blankCartLine(cartId: Int!): CartLine!
    deleteCart(id: Int!): Boolean!
    deleteCartLine(cartLineId: Int!, cartId: Int!): Boolean!
    updateCartLine(cartLine: CartLineInput!): CartLine
    updateCart(cart: CartInput!): Cart
    register(options: UsernamePasswordInput!): UserResponse!
    login(password: String!, usernameOrEmail: String!): UserResponse!
    forgotPassword(email: String!): Boolean!
    changePassword(newPassword: String!, token: String!): UserResponse!
    logout: Boolean!
    updateUser(currentCartId: Int!): UserResponse!
    addCartLineAccount(
      amount: Float!
      accountNumber: String!
      cartLineId: Int!
      cartId: Int!
    ): CartLineAccount!
    updateCartLineAccount(amount: Float!, id: Int!): CartLineAccount!
    deleteCartLineAccount(cartLineAccountId: Int!): Boolean!
  }
  
  input CartLineInput {
    id: Int!
    cartId: Int!
    categoryId: Int!
    quantity: Int!
    price: Float!
    itemId: String!
    description: String!
    uom: String!
  }
  
  input CartInput {
    id: Int!
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