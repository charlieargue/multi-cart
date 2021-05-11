
## -------------------------------------
## CARTS
## -------------------------------------

# (CREATE) BLANK CART
# TODO: security and other todos
resource "aws_appsync_resolver" "blank_cart_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "blankCart"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/blankCart/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}

# (CREATE) BLANK CART LINE
# TODO: security and other todos
resource "aws_appsync_resolver" "blank_cart_line_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "blankCartLine"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/blankCartLine/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/cart-resolvers/blankCartLine/response-mapping.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}

# TODO: security and other todos
resource "aws_appsync_resolver" "delete_cart_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "deleteCart"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/deleteCart/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-BOOLEAN.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}

# (UPDATE) CART - just name for now
# TODO: security and other todos
resource "aws_appsync_resolver" "update_cart_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "updateCart"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/updateCart/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}




## -------------------------------------
## ACCOUNTS
## -------------------------------------

# TODO: security and other todos
resource "aws_appsync_resolver" "hydrate_accounts_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "hydrateAccounts"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_account_datasource.name
  request_template  = file("./AppSync/resolvers/account-resolvers/hydrateAccounts/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-BOOLEAN.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
    aws_appsync_datasource.multicart_dynamodb_account_datasource,
  ]
}


## -------------------------------------
## USERS
## -------------------------------------


# TODO: security and other todos
# TODO: how is this returning a UserResponse? where is the .user / .error nesting happening?
resource "aws_appsync_resolver" "register_user_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "register"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
  request_template  = file("./AppSync/resolvers/user-resolvers/register/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
    aws_appsync_datasource.multicart_dynamodb_user_datasource,
  ]
}


# TODO: security and other todos
resource "aws_appsync_resolver" "logout_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "logout"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.none_datasource.name
  request_template  = file("./AppSync/resolvers/user-resolvers/logout/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-BOOLEAN.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
    aws_appsync_datasource.none_datasource,
  ]
}

# (UPDATE) USER - just currentCartId
# TODO: security and other todos
resource "aws_appsync_resolver" "update_user_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "updateUser"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
  request_template  = file("./AppSync/resolvers/user-resolvers/updateUser/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/user-resolvers/updateUser/response-mapping.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
    aws_appsync_datasource.multicart_dynamodb_user_datasource,
  ]
}