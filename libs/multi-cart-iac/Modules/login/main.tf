## ARCHIVE/ZIP
data "archive_file" "lambda_login_archive" {
  type        = "zip"
  source_dir  = "./AppSync/lambdas/login"
  output_path = "./build/${local.filename}"
  output_file_mode = "0666" # solution for unecessarily recyling of lambdas
}

# AWS LAMBDA ƛ FUNCTION
resource "aws_lambda_function" "lambda_login_function" {
  function_name    = "lambda_login_function_${var.common_tags.Environment}"
  role             = var.role_arn
  handler          = "exports.handler"
  source_code_hash = data.archive_file.lambda_login_archive.output_base64sha256
  filename         = data.archive_file.lambda_login_archive.output_path
  runtime          = "nodejs12.x"
  publish          = true
  environment {
    variables = {
      POOL_ID        = var.pool_id,
      CLIENT_ID      = var.client_id,
      AWS_REGION_VAR = var.aws_region
    }
  }
  lifecycle {
    ignore_changes = [
      filename,
      last_modified,
      qualified_arn,
      version,
    ]
  }
  tags = merge(var.common_tags, {
    Description = "AWS lambda function for Loggin In"
  })
}



# # LAMBDA ƛ DATASOURCE
resource "aws_appsync_datasource" "lambda_login_datasource" {
  api_id           = var.app_id
  name             = "lambda_login_datasource"
  service_role_arn = var.role_arn
  type             = "AWS_LAMBDA"
  lambda_config {
    function_arn = aws_lambda_function.lambda_login_function.arn
  }
}

## LAMBDA AppSync function WRAPPER
resource "aws_appsync_function" "lambda_login_appsync_function" {
  api_id                    = var.app_id
  data_source               = aws_appsync_datasource.lambda_login_datasource.name
  name                      = "lambda_login_appsync_function"
  request_mapping_template  = file(var.lambda_request_vtl)
  response_mapping_template = file(var.lambda_response_vtl)
}


