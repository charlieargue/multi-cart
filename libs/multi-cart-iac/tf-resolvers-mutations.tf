
##################################################################################
# CARTS
##################################################################################

# (CREATE) BLANK CART LINE
# TODO: security and other todos
resource "aws_appsync_resolver" "blank_cart_line_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "blankCartLine"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/blankCartLine/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-cart-SINGULAR-by-stash.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}

# (ADD) CART LINE - eg. from Add2Cart button on products list
# TODO: security and other todos
resource "aws_appsync_resolver" "add_cart_line_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "addCartLine"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/addCartLine/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-cart-SINGULAR-by-stash.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}

# TODO: security and other todos
resource "aws_appsync_resolver" "delete_cart_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "deleteCart"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/deleteCart/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-BOOLEAN.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}

# (UPDATE) CART - just name for now
# TODO: security and other todos
resource "aws_appsync_resolver" "update_cart_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "updateCart"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  request_template  = file("./AppSync/resolvers/cart-resolvers/updateCart/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_cart_datasource,
  ]
}



##################################################################################
# ACCOUNTS
##################################################################################

# TODO: security and other todos
resource "aws_appsync_resolver" "hydrate_accounts_resolver" {
  api_id      = aws_appsync_graphql_api.MultiCart.id
  field       = "hydrateAccounts"
  type        = "Mutation"
  data_source = aws_appsync_datasource.multicart_dynamodb_account_datasource.name
  request_template = templatefile("./AppSync/resolvers/account-resolvers/hydrateAccounts/request-mapping.vtl", {
    # NOTE: because different environment suffixes
    ACCOUNT_TABLE_NAME = aws_dynamodb_table.account_dynamo_table.name
  })
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-BOOLEAN.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.multicart_dynamodb_account_datasource,
  ]
}

##################################################################################
# USERS
##################################################################################


# TODO: security and other todos
resource "aws_appsync_resolver" "logout_resolver" {
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "logout"
  type              = "Mutation"
  data_source       = aws_appsync_datasource.none_datasource.name
  request_template  = file("./AppSync/resolvers/user-resolvers/logout/request-mapping.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-BOOLEAN.vtl")
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_appsync_datasource.none_datasource,
  ]
}