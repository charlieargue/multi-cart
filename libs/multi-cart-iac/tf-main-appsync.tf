## ------------------------------
resource "aws_appsync_graphql_api" "MultiCart" {
  name   = "MultiCart_${local.common_tags.Environment}"
  schema = file("./AppSync/schema/schema.gql")

  # default UN-AUTHENTICATED access for all PUBLIC endpoints:
  authentication_type = "AWS_IAM"

  # USER AUTHENTICATION for all PRIVATE endpoints:
  additional_authentication_provider {
    authentication_type = "AMAZON_COGNITO_USER_POOLS"
    user_pool_config {
      aws_region     = var.AWS_REGION
      user_pool_id   = aws_cognito_user_pool.multicart_app_user_pool.id
    }
  }



  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.multicart_appsync_logging_role.arn
    field_log_level          = "ALL"
  }
  tags = merge(local.common_tags, {
    Description = "GraphQL AppSync API for MultiCart"
  })
}
