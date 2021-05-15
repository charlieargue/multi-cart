# thx: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/appsync_graphql_api
## ------------------------------
resource "aws_appsync_graphql_api" "MultiCart" {
  name   = "MultiCart_${local.common_tags.Environment}"
  schema = file("./AppSync/schema/schema.gql")

  # TODO: this is temp, for during-inital-development ONLY! switch to a client-pool via COGNITO-user-pools for CLIENT-APP AUTHENTICATION later!
  authentication_type = "API_KEY"

  # USER AUTHENTICATION is done with this:
  additional_authentication_provider {
    authentication_type = "AMAZON_COGNITO_USER_POOLS"
    user_pool_config {
      aws_region = var.AWS_REGION
      user_pool_id = "${aws_cognito_user_pool.multicart_app_user_pool.id}"
    }
  }

  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.multicart_appsync_logging_role.arn
    field_log_level          = "ALL"
  }
  tags = merge(local.common_tags, {
    Description = "GraphQL API for MultiCart"
  })
}

resource "aws_appsync_api_key" "api_key" {
  api_id = aws_appsync_graphql_api.MultiCart.id
}
