# 🎩 thx: https://www.terraform.io/docs/providers/aws/r/appsync_datasource.html

# ROLE
# - allows AppSync service to assume IAM role for accessing DynamoDB tables
resource "aws_iam_role" "iam_role_for_dynamo" {
  name               = "${local.common_tags.AppPrefix}iam_role_for_dynamo_${local.common_tags.Environment}"
  assume_role_policy = file("./AppSync/policies-roles/AppSync/role.json")
}


# POLICY
# TODO: CONFUSION: is this used? where? how? maybe it just needs to exist... and not referenced by TF
resource "aws_iam_role_policy" "iam_role_policy_for_dynamo" {
  name = "${local.common_tags.AppPrefix}iam_role_policy_for_dynamo_${local.common_tags.Environment}"
  role = aws_iam_role.iam_role_for_dynamo.id
  policy = templatefile("./AppSync/policies-roles/DynamoDB/policy.json", {
    USER_TABLE_ARN    = aws_dynamodb_table.user_dynamo_table.arn,
    CART_TABLE_ARN    = aws_dynamodb_table.cart_dynamo_table.arn,
    ACCOUNT_TABLE_ARN = aws_dynamodb_table.account_dynamo_table.arn,
  })
}

## ROLE for lambdas ƛ 
# (thx: https://www.terraform.io/docs/providers/aws/r/lambda_function.html)
resource "aws_iam_role" "iam_role_for_lambda" {
  name               = "${local.common_tags.AppPrefix}iam_role_for_lambda_${local.common_tags.Environment}"
  assume_role_policy = file("./AppSync/policies-roles/lambdas/role.json")
  tags = merge(local.common_tags, {
    Description = "AWS IAM role for Lambda functions"
  })
}

# ROLE + POLICY for lambdas ƛ 
resource "aws_iam_role_policy" "iam_role_policy_for_lambda" {
  name = "${local.common_tags.AppPrefix}iam_role_policy_for_lambda_${local.common_tags.Environment}"
  role = aws_iam_role.iam_role_for_lambda.id
  policy = templatefile("./AppSync/policies-roles/lambdas/policy.json", {
    # VIP: don't forget to list all lambdas here
    GET_LAMBDA_SEND_EMAIL_ARN = module.send_email.function_arn,
    GET_LAMBDA_LOGIN_ARN      = module.login.function_arn,
    GET_LAMBDA_LOGOUT_ARN      = module.logout.function_arn,
    GET_LAMBDA_REGISTER_ARN   = module.register.function_arn,
    USER_POOL_ARN             = aws_cognito_user_pool.multicart_app_user_pool.arn,
  })
}


# CLOUDWATCH loggin for lambdas ƛ 
# thx: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function#cloudwatch-logging-and-permissions
# TODO: if works, move out to .json file!
resource "aws_iam_policy" "lambda_logging" {
  name        = "${local.common_tags.AppPrefix}lambda_logging_${local.common_tags.Environment}"
  path        = "/"
  description = "IAM policy for logging from a lambda"
  policy      = file("./AppSync/policies-roles/CloudWatch/policy.json")
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_role_for_lambda.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

# CLOUDWATCH loggin for APP SYNC
# appsync logging (w/ assumed roles/IAM for cloudwatch)
resource "aws_iam_role" "multicart_appsync_logging_role" {
  name               = "${local.common_tags.AppPrefix}appsync_logging_role_${local.common_tags.Environment}"
  assume_role_policy = file("./AppSync/policies-roles/AppSync/logging_role_policy.json")
}
resource "aws_iam_role_policy_attachment" "appsync_logging_role_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs"
  role       = aws_iam_role.multicart_appsync_logging_role.name
  depends_on = [
    aws_iam_role.multicart_appsync_logging_role,
  ]
}
