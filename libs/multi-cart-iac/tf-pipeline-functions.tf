# DESCRIPTION:
# AppSync "wrapper" FUNCTIONs so can be called from pipeline resolvers

## -------------------------------------
## USERS
## -------------------------------------

resource "aws_appsync_function" "get_user_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
  name                      = "get_user_function"
  request_mapping_template  = file("./AppSync/functions/getUser/request-mapping.vtl")
  response_mapping_template = file("./AppSync/resolvers/_generic/generic-response-mapping-items-NULL-OR-FIRST.vtl")
}

resource "aws_appsync_function" "add_user_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
  name                      = "add_user_function"
  request_mapping_template  = file("./AppSync/functions/addUser/request-mapping.vtl")
  response_mapping_template = file("./AppSync/functions/addUser/response-mapping.vtl")
}

resource "aws_appsync_function" "me_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
  name                      = "me_function"
  request_mapping_template  = file("./AppSync/resolvers/user-resolvers/me/request-mapping.vtl")
  response_mapping_template = file("./AppSync/resolvers/_generic/generic-response-mapping-items-NULL-OR-FIRST.vtl")
}


## -------------------------------------
## CARTS
## -------------------------------------


resource "aws_appsync_function" "get_cart_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "get_cart_function"
  request_mapping_template  = file("./AppSync/functions/getCart/request-mapping.vtl")
  response_mapping_template = file("./AppSync/functions/getCart/response-mapping.vtl")
}

resource "aws_appsync_function" "delete_cart_line_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "delete_cart_line_function"
  request_mapping_template  = file("./AppSync/functions/deleteCartLine/request-mapping.vtl")
  response_mapping_template = file("./AppSync/functions/deleteCartLine/response-mapping.vtl")
}

resource "aws_appsync_function" "update_cart_line_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "update_cart_line_function"
  request_mapping_template  = file("./AppSync/functions/updateCartLine/request-mapping.vtl")
  response_mapping_template = file("./AppSync/functions/updateCartLine/response-mapping.vtl")
}


resource "aws_appsync_function" "add_cart_line_account_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "add_cart_line_account_function"
  request_mapping_template  = file("./AppSync/functions/addCartLineAccount/request-mapping.vtl")
  response_mapping_template = file("./AppSync/functions/addCartLineAccount/response-mapping.vtl")
}


resource "aws_appsync_function" "delete_cart_line_account_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "delete_cart_line_account_function"
  request_mapping_template  = file("./AppSync/functions/deleteCartLineAccount/request-mapping.vtl")
  response_mapping_template = file("./AppSync/functions/deleteCartLineAccount/response-mapping.vtl")
}


resource "aws_appsync_function" "update_cart_line_account_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "update_cart_line_account_function"
  request_mapping_template  = file("./AppSync/functions/updateCartLineAccount/request-mapping.vtl")
  response_mapping_template = file("./AppSync/functions/updateCartLineAccount/response-mapping.vtl")
}

## -------------------------------------
## ACCOUNTS
## -------------------------------------

resource "aws_appsync_function" "get_account_function" {
  api_id                    = aws_appsync_graphql_api.MultiCart.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_account_datasource.name
  name                      = "get_account_function"
  request_mapping_template  = file("./AppSync/functions/getAccount/request-mapping.vtl")
  response_mapping_template = file("./AppSync/resolvers/_generic/generic-response-mapping-items-NULL-OR-FIRST.vtl")
  # response_mapping_template = file("./AppSync/functions/getAccount/response-mapping.vtl")
}
