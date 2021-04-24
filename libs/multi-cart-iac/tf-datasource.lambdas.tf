# LAMBDA ƛ DATASOURCE
resource "aws_appsync_datasource" "lambda_send_email_datasource" {
  api_id           = aws_appsync_graphql_api.MultiCartPOC.id
  name             = "lambda_send_email_datasource"
  service_role_arn = aws_iam_role.iam_role_for_lambda.arn
  type             = "AWS_LAMBDA"
  lambda_config {
    function_arn = aws_lambda_function.lambda_send_email_function.arn
  }
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
  ]
}


