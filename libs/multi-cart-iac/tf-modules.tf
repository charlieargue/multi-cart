##################################################################################
# MODULES
##################################################################################

## ------------------------------ 
# send email
## ------------------------------ 
# DECOMISH? NOT USED RIGHT NOW
module "send_email" {
  #   inputs:
  role_arn            = aws_iam_role.iam_role_for_lambda.arn
  aws_region          = var.AWS_REGION
  app_id              = aws_appsync_graphql_api.MultiCart.id
  common_tags         = local.common_tags
  lambda_request_vtl  = "./AppSync/functions/lambdaSendEmail/request-mapping.vtl"
  lambda_response_vtl = "./AppSync/functions/lambdaSendEmail/response-mapping.vtl"

  source = "./Modules/send-email"
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}

## ------------------------------ 
# login
## ------------------------------ 
module "login" {
  #   inputs:
  role_arn            = aws_iam_role.iam_role_for_lambda.arn
  aws_region          = var.AWS_REGION
  app_id              = aws_appsync_graphql_api.MultiCart.id
  common_tags         = local.common_tags
  lambda_request_vtl  = "./AppSync/functions/lambdaLogin/request-mapping.vtl"
  lambda_response_vtl = "./AppSync/functions/lambdaLogin/response-mapping.vtl"
  pool_id             = aws_cognito_user_pool.multicart_app_user_pool.id
  client_id           = aws_cognito_user_pool_client.multicart_app_user_pool_client.id

  source = "./Modules/login"
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}


## ------------------------------ 
# logout
## ------------------------------ 
module "logout" {
  #   inputs:
  role_arn            = aws_iam_role.iam_role_for_lambda.arn
  aws_region          = var.AWS_REGION
  app_id              = aws_appsync_graphql_api.MultiCart.id
  common_tags         = local.common_tags
  lambda_request_vtl  = "./AppSync/functions/lambdaLogout/request-mapping.vtl"
  lambda_response_vtl = "./AppSync/resolvers/_generic/generic-response-mapping-item-BOOLEAN.vtl"
  pool_id             = aws_cognito_user_pool.multicart_app_user_pool.id
  client_id           = aws_cognito_user_pool_client.multicart_app_user_pool_client.id

  source = "./Modules/logout"
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}

## ------------------------------ 
# register
## ------------------------------ 
module "register" {
  #   inputs:
  role_arn            = aws_iam_role.iam_role_for_lambda.arn
  aws_region          = var.AWS_REGION
  app_id              = aws_appsync_graphql_api.MultiCart.id
  common_tags         = local.common_tags
  lambda_request_vtl  = "./AppSync/functions/lambdaRegister/request-mapping.vtl"
  lambda_response_vtl = "./AppSync/functions/lambdaRegister/response-mapping.vtl"
  pool_id             = aws_cognito_user_pool.multicart_app_user_pool.id
  client_id           = aws_cognito_user_pool_client.multicart_app_user_pool_client.id

  source = "./Modules/register"
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}

## ------------------------------ 
# forgot password
## ------------------------------ 
module "forgot_password" {
  #   inputs:
  role_arn            = aws_iam_role.iam_role_for_lambda.arn
  aws_region          = var.AWS_REGION
  app_id              = aws_appsync_graphql_api.MultiCart.id
  common_tags         = local.common_tags
  lambda_request_vtl  = "./AppSync/functions/lambdaForgotPassword/request-mapping.vtl"
  lambda_response_vtl = "./AppSync/resolvers/_generic/generic-response-mapping-item-BOOLEAN.vtl"
  pool_id             = aws_cognito_user_pool.multicart_app_user_pool.id
  client_id           = aws_cognito_user_pool_client.multicart_app_user_pool_client.id

  source = "./Modules/forgot-password"
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}


## ------------------------------ 
# cognito email customizations
## ------------------------------ 
module "cognito_email_customizations" {
  #   inputs:
  role_arn    = aws_iam_role.iam_role_for_lambda.arn
  aws_region  = var.AWS_REGION
  app_id      = aws_appsync_graphql_api.MultiCart.id
  common_tags = local.common_tags

  source = "./Modules/cognito-email-customizations"
}