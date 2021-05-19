##################################################################################
# MODULES
##################################################################################

# 
# send email
module "send_email" {
  #   inputs:
  role_arn   = aws_iam_role.iam_role_for_lambda.arn
  aws_region = var.AWS_REGION
  app_id     = aws_appsync_graphql_api.MultiCart.id
  common_tags = local.common_tags
  lambda_request_vtl = "./AppSync/functions/lambdaSendEmail/request-mapping.vtl"
  lambda_response_vtl = "./AppSync/functions/lambdaSendEmail/response-mapping.vtl"

  source      = "./Modules/send-email"
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}
