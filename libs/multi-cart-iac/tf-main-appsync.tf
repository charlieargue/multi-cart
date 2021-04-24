
resource "aws_appsync_graphql_api" "MultiCartPOC" {
  authentication_type = "API_KEY"
  name                = "MultiCartPOC"
  schema              = file("./iac/AppSync/schema/schema.gql")
  log_config {
    cloudwatch_logs_role_arn = aws_iam_role.multicart_appsync_logging_role.arn
    field_log_level          = "ALL"
  }
}

resource "aws_appsync_api_key" "api_key" {
  api_id = "c4h3m6svizchdi7bqp2l4ts3gm"
}