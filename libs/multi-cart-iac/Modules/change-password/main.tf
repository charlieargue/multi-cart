## ARCHIVE/ZIP
data "archive_file" "lambda_change_password_archive" {
  type = "zip"
  source_dir  = "./AppSync/lambdas/changePassword"
  output_path = "./build/${local.filename}"
}

# AWS LAMBDA ƛ FUNCTION
resource "aws_lambda_function" "lambda_change_password_function" {
  function_name    = "lambda_change_password_function_${var.common_tags.Environment}"
  role             = var.role_arn
  handler          = "exports.handler"
  source_code_hash = data.archive_file.lambda_change_password_archive.output_base64sha256
  filename         = "./build/${local.filename}"
  runtime          = "nodejs12.x"
  publish          = true
  environment {
    variables = {
      AWS_REGION_VAR = var.aws_region
    }
  }
  # tags = merge(var.common_tags, {
  #   Description = "AWS lambda function for changing cognito passwords (step 2 of forgot password)"
  # })
}


# # # LAMBDA ƛ DATASOURCE
# resource "aws_appsync_datasource" "lambda_change_password_datasource" {
#   api_id           = var.app_id
#   name             = "lambda_change_password_datasource"
#   service_role_arn = var.role_arn
#   type             = "AWS_LAMBDA"
#   lambda_config {
#     function_arn = aws_lambda_function.lambda_change_password_function.arn
#   }
# }



# # NOTE: this is a DIRECT LAMBDA (unit) resolver (with NO VTLs)
# # thx: https://github.com/hashicorp/terraform-provider-aws/issues/14488
# resource "aws_appsync_resolver" "change_password_resolver" {
#   api_id            = var.app_id
#   field             = "changePassword"
#   type              = "Mutation"
#   data_source       = aws_appsync_datasource.lambda_change_password_datasource.name
# }