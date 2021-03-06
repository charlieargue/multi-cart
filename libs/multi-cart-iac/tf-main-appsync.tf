## ------------------------------
resource "aws_appsync_graphql_api" "MultiCart" {
  name   = "MultiCart_${local.common_tags.Environment}"
  schema = file("./AppSync/schema/schema.gql")

  # USER AUTHENTICATION for all PRIVATE endpoints:
  authentication_type = "AMAZON_COGNITO_USER_POOLS"
  user_pool_config {
    aws_region   = var.AWS_REGION
    user_pool_id = aws_cognito_user_pool.multicart_app_user_pool.id

    # (Required only if Cognito is used as the default auth provider) 
    # The action that you want your GraphQL API to take when a request that uses Amazon Cognito User Pool authentication 
    # doesn't match the Amazon Cognito User Pool configuration. Valid: ALLOW and DENY
    # TODO: confusion on this setting and its effects, TBD... it doesn't work apparently, as you would imagine
    default_action = "ALLOW"
  }

  # UN-AUTHENTICATED access for all PUBLIC endpoints: 
  # NOTE: could NOT get AWS_IAM to work for unauthenticated, and turns out you can have API_KEYS valid for 1 year, so...
  additional_authentication_provider {
    authentication_type = "API_KEY"
  }

  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.multicart_appsync_logging_role.arn
    field_log_level          = "ALL"
  }
  tags = merge(local.common_tags, {
    Description = "GraphQL AppSync API for MultiCart"
  })
}

resource "aws_appsync_api_key" "key" {
  api_id  = aws_appsync_graphql_api.MultiCart.id
  expires = "2022-05-26T04:00:00Z" # approx. 1 year from now 
}
