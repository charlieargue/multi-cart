## ARCHIVE/ZIP
data "archive_file" "lambda_cognito_email_customizations_archive" {
  type = "zip"
  source_dir  = "./AppSync/lambdas/cognitoEmailCustomizations"
  output_path = "./build/${local.filename}"
}

# AWS LAMBDA ƛ FUNCTION
resource "aws_lambda_function" "lambda_cognito_email_customizations_function" {
  function_name    = "lambda_cognito_email_customizations_function_${var.common_tags.Environment}"
  role             = var.role_arn
  handler          = "exports.handler"
  source_code_hash = data.archive_file.lambda_cognito_email_customizations_archive.output_base64sha256
  filename         = "./build/${local.filename}"
  runtime          = "nodejs12.x"
  publish          = true
  environment {
    variables = {
      AWS_REGION_VAR = var.aws_region
    }
  }
  tags = merge(var.common_tags, {
    Description = "AWS lambda function for customiz cognito emails"
  })
}


# # LAMBDA ƛ DATASOURCE
resource "aws_appsync_datasource" "lambda_cognito_email_customizations_datasource" {
  api_id           = var.app_id
  name             = "lambda_cognito_email_customizations_datasource"
  service_role_arn = var.role_arn
  type             = "AWS_LAMBDA"
  lambda_config {
    function_arn = aws_lambda_function.lambda_cognito_email_customizations_function.arn
  }
}
