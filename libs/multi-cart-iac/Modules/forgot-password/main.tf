## ARCHIVE/ZIP
data "archive_file" "lambda_forgot_password_archive" {
  type        = "zip"
  source_dir  = "./AppSync/lambdas/forgotPassword"
  output_path = "./build/${local.filename}"
  output_file_mode = "0666" # solution for unecessarily recyling of lambdas
}

# AWS LAMBDA ƛ FUNCTION
resource "aws_lambda_function" "lambda_forgot_password_function" {
  function_name    = "lambda_forgot_password_function_${var.common_tags.Environment}"
  role             = var.role_arn
  handler          = "exports.handler"
  source_code_hash = data.archive_file.lambda_forgot_password_archive.output_base64sha256
  filename         = data.archive_file.lambda_forgot_password_archive.output_path
  runtime          = "nodejs12.x"
  publish          = true
  environment {
    variables = {
      # DECOMISH:
      POOL_ID        = var.pool_id,
      CLIENT_ID      = var.client_id,
      AWS_REGION_VAR = var.aws_region
    }
  }
  lifecycle {
    ignore_changes = [source_code_hash,
      filename,
      last_modified,
      qualified_arn,
      version,
    ]
  }
  tags = merge(var.common_tags, {
    Description = "AWS lambda function for starting recover of Forgotten Password"
  })
}


# LAMBDA ƛ DATASOURCE
resource "aws_appsync_datasource" "lambda_forgot_password_datasource" {
  api_id           = var.app_id
  name             = "lambda_forgot_password_datasource"
  service_role_arn = var.role_arn
  type             = "AWS_LAMBDA"
  lambda_config {
    function_arn = aws_lambda_function.lambda_forgot_password_function.arn
  }
}

# DECOMISH
# NOTE: still not sure if better to put aws_appsync_resolvers all into these modules, or leave them "out there" (see change-password.module.main.tf also)
#       - same not-sure applies to the VTLs (should I put VTLs inside these modules?)
# NOTE: no appsync wrapper function since this will be a DIRECT LAMBDA resolver
# thx: https://github.com/hashicorp/terraform-provider-aws/issues/14488
# resource "aws_appsync_resolver" "forgot_password_resolver" {
#   api_id            = var.app_id
#   field             = "forgotPassword"
#   type              = "Mutation"
#   data_source       = aws_appsync_datasource.lambda_forgot_password_datasource.name
#   request_template  = file(var.lambda_request_vtl)
#   response_template = file(var.lambda_response_vtl)
# }


## LAMBDA AppSync function WRAPPER
resource "aws_appsync_function" "lambda_forgot_password_appsync_function" {
  api_id                    = var.app_id
  data_source               = aws_appsync_datasource.lambda_forgot_password_datasource.name
  name                      = "lambda_forgot_password_appsync_function"
  request_mapping_template  = file(var.lambda_request_vtl)
  response_mapping_template = file(var.lambda_response_vtl)
}


