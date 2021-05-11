# 🎩 thx: https://www.terraform.io/docs/providers/aws/r/appsync_datasource.html

# ROLE
# - allows AppSync service to assume IAM role for accessing DynamoDB tables
resource "aws_iam_role" "iam_role_for_dynamo" {
  name               = "iam_role_for_dynamo"
  assume_role_policy = file("./AppSync/policies-roles/AppSync/role.json")
}


# POLICY
# CONFUSION: is this used? where? how?
resource "aws_iam_role_policy" "iam_role_policy_for_dynamo" {
  name = "iam_role_policy_for_dynamo"
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
  name               = "iam_role_for_lambda"
  assume_role_policy = file("./AppSync/policies-roles/lambdas/role.json")
}

# ROLE + POLICY for lambdas ƛ 
resource "aws_iam_role_policy" "iam_role_policy_for_lambda" {
  name = "iam_role_policy_for_lambda"
  role = aws_iam_role.iam_role_for_lambda.id
  policy = templatefile("./AppSync/policies-roles/lambdas/policy.json", {
    GET_LAMBDA_ARN = module.send_email.function_arn,
  })
}


# CLOUDWATCH loggin for lambdas ƛ 
# thx: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function#cloudwatch-logging-and-permissions
# TODO: if works, move out to .json file!
resource "aws_iam_policy" "lambda_logging" {
  name        = "lambda_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_role_for_lambda.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}