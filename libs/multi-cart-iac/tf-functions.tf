

## -------------------------------------
## USERS
## -------------------------------------

# pipeline FUNCTION - getUser
resource "aws_appsync_function" "get_user_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
  name                      = "get_user_function"
  request_mapping_template  = file("./iac/AppSync/functions/getUser/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/getUser/response-mapping.vtl")
}


## -------------------------------------
## CARTS
## -------------------------------------


# pipeline FUNCTION - 
resource "aws_appsync_function" "get_cart_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "get_cart_function"
  request_mapping_template  = file("./iac/AppSync/functions/getCart/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/getCart/response-mapping.vtl")
}

# pipeline FUNCTION - 
resource "aws_appsync_function" "delete_cart_line_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "delete_cart_line_function"
  request_mapping_template  = file("./iac/AppSync/functions/deleteCartLine/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/deleteCartLine/response-mapping.vtl")
}

# pipeline FUNCTION - 
resource "aws_appsync_function" "update_cart_line_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "update_cart_line_function"
  request_mapping_template  = file("./iac/AppSync/functions/updateCartLine/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/updateCartLine/response-mapping.vtl")
}

# pipeline FUNCTION - 
resource "aws_appsync_function" "add_cart_line_account_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "add_cart_line_account_function"
  request_mapping_template  = file("./iac/AppSync/functions/addCartLineAccount/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/addCartLineAccount/response-mapping.vtl")
}

# pipeline FUNCTION - 
resource "aws_appsync_function" "delete_cart_line_account_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "delete_cart_line_account_function"
  request_mapping_template  = file("./iac/AppSync/functions/deleteCartLineAccount/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/deleteCartLineAccount/response-mapping.vtl")
}

# pipeline FUNCTION - 
resource "aws_appsync_function" "update_cart_line_account_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
  name                      = "update_cart_line_account_function"
  request_mapping_template  = file("./iac/AppSync/functions/updateCartLineAccount/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/updateCartLineAccount/response-mapping.vtl")
}

## -------------------------------------
## ACCOUNTS
## -------------------------------------
# pipeline FUNCTION - 
resource "aws_appsync_function" "get_account_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.multicart_dynamodb_account_datasource.name
  name                      = "get_account_function"
  request_mapping_template  = file("./iac/AppSync/functions/getAccount/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/getAccount/response-mapping.vtl")
}


## -------------------------------------
## LAMBDA WRAPPERs
## -------------------------------------

# WRAPPER FUNCTION for lambda (so can be called from pipeline resolver)
resource "aws_appsync_function" "lambda_send_email_appsync_function" {
  api_id                    = aws_appsync_graphql_api.MultiCartPOC.id
  data_source               = aws_appsync_datasource.lambda_send_email_datasource.name
  name                      = "lambda_send_email_appsync_function"
  request_mapping_template  = file("./iac/AppSync/functions/lambdaSendEmail/request-mapping.vtl")
  response_mapping_template = file("./iac/AppSync/functions/lambdaSendEmail/response-mapping.vtl")
}
