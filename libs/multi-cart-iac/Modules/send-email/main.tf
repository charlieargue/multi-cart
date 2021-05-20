## ARCHIVE/ZIP
data "archive_file" "lambda_send_email_archive" {
  type = "zip"

  # ATTN: this module will be collapsed/flattened by terraform, so PATHS are from root directory, not from nested module!
  source_dir  = "./AppSync/lambdas/sendEmail"
  output_path = "./build/${local.filename}"
}

# AWS LAMBDA ƛ FUNCTION
resource "aws_lambda_function" "lambda_send_email_function" {
  function_name    = "lambda_send_email_function_${var.common_tags.Environment}"
  role             = var.role_arn
  handler          = "exports.handler"
  source_code_hash = data.archive_file.lambda_send_email_archive.output_base64sha256
  filename         = "./build/${local.filename}"
  runtime          = "nodejs12.x"
  publish          = true
  environment {
    variables = {
      AWS_REGION_VAR = var.aws_region
    }
  }
  tags = merge(var.common_tags, {
    Description = "AWS lambda function for Sending Email"
  })
}


# LAMBDA ƛ DATASOURCE
resource "aws_appsync_datasource" "lambda_send_email_datasource" {
  api_id           = var.app_id
  name             = "lambda_send_email_datasource"
  service_role_arn = var.role_arn
  type             = "AWS_LAMBDA"
  lambda_config {
    function_arn = aws_lambda_function.lambda_send_email_function.arn
  }
}

## LAMBDA AppSync function WRAPPER
resource "aws_appsync_function" "lambda_send_email_appsync_function" {
  api_id                    = var.app_id
  data_source               = aws_appsync_datasource.lambda_send_email_datasource.name
  name                      = "lambda_send_email_appsync_function"
  request_mapping_template  = file(var.lambda_request_vtl)
  response_mapping_template = file(var.lambda_response_vtl)
}


