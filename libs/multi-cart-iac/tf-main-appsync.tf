resource "aws_appsync_graphql_api" "MultiCartPOC" {
  authentication_type = "API_KEY"
  name                = "MultiCartPOC"
  schema              = file("./AppSync/schema/schema.gql")
  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.multicart_appsync_logging_role.arn
    field_log_level          = "ALL"
  }
  tags = merge(local.common_tags, {
    Description = "GraphQL API for MultiCart"
  })
}

resource "aws_appsync_api_key" "api_key" {
  api_id = var.aws_appsync_api_key
}