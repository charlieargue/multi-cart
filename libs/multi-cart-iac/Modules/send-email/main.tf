
##################################################################################
## • archive/zip of files
## • function and wrapper function 
## • datasource 
##################################################################################


## ARCHIVE/ZIP
data "archive_file" "lambda_send_email_archive" {
  type        = "zip"
  source_dir  = "./AppSync/lambdas/sendEmail"
  output_path = "./build/MultiCartPOC_lambda_send_email.zip"
}

# AWS LAMBDA ƛ FUNCTION
resource "aws_lambda_function" "lambda_send_email_function" {
  filename         = data.archive_file.lambda_send_email_archive.output_path
  function_name    = "lambda_send_email_function"
  role             = var.role_arn
  handler          = "exports.handler"
  source_code_hash = data.archive_file.lambda_send_email_archive.output_base64sha256
  runtime          = "nodejs12.x"
  publish          = true
  environment {
    variables = {
      aws_region = var.aws_region
    }
  }
  # depends_on = [
  #   aws_iam_role_policy_attachment.lambda_logs,
  # ]
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
  # depends_on = [
  #   aws_appsync_graphql_api.MultiCartPOC,
  # ]
}


