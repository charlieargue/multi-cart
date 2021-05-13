##################################################################################
# MODULES
##################################################################################

# 
# send email
module "send_email" {
  #   inputs:
  role_arn   = aws_iam_role.iam_role_for_lambda.arn
  aws_region = var.aws_region
  app_id     = aws_appsync_graphql_api.MultiCart.id

  source      = "./Modules/send-email"
  common_tags = local.common_tags

  depends_on = [
    aws_appsync_graphql_api.MultiCart,
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}
