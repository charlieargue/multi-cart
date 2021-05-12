
# (LIST ALL) USERS
resource "aws_appsync_resolver" "list_users_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "users"
  type              = "Query"
  data_source       = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
  request_template  = file("./AppSync/resolvers/user-resolvers/users/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-items.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_user_datasource,
  ]
}

# (TODO: base on session) ME
resource "aws_appsync_resolver" "me_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "me"
  type              = "Query"
  data_source       = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
  request_template  = file("./AppSync/resolvers/user-resolvers/me/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_user_datasource,
  ]
}

# (LIST ALL) ACCOUNTS
resource "aws_appsync_resolver" "list_accounts_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "accounts"
  type              = "Query"
  data_source       = aws_appsync_datasource.multicart_dynamodb_account_datasource.name
  request_template  = file("./AppSync/resolvers/account-resolvers/accounts/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-items.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_account_datasource,
  ]
}


# (LIST ALL) CARTS 
# TODO: current users carts!
resource "aws_appsync_resolver" "list_carts_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "carts"
  type              = "Query"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/carts/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-items.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}


# (GET SINGLE) CART
# TODO: security and other todos
resource "aws_appsync_resolver" "get_cart_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "cart"
  type              = "Query"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/cart/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}
