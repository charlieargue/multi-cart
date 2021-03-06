## ARCHIVE/ZIP
data "archive_file" "lambda_change_password_archive" {
  type             = "zip"
  source_dir       = "./AppSync/lambdas/changePassword"
  output_path      = "./build/${local.filename}"
  output_file_mode = "0666" # solution for unecessarily recyling of lambdas
}

# AWS LAMBDA ƛ FUNCTION
resource "aws_lambda_function" "lambda_change_password_function" {
  function_name    = "lambda_change_password_function_${var.common_tags.Environment}"
  role             = var.role_arn
  handler          = "exports.handler"
  source_code_hash = data.archive_file.lambda_change_password_archive.output_base64sha256
  filename         = data.archive_file.lambda_change_password_archive.output_path
  runtime          = "nodejs12.x"
  publish          = true
  environment {
    variables = {
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
    Description = "AWS lambda function for changing passwords"
  })
}


# # # LAMBDA ƛ DATASOURCE
resource "aws_appsync_datasource" "lambda_change_password_datasource" {
  api_id           = var.app_id
  name             = "lambda_change_password_datasource"
  service_role_arn = var.role_arn
  type             = "AWS_LAMBDA"
  lambda_config {
    function_arn = aws_lambda_function.lambda_change_password_function.arn
  }
}



# # NOTE: this is a DIRECT LAMBDA (unit) resolver (with NO VTLs)
# # thx: https://github.com/hashicorp/terraform-provider-aws/issues/14488
resource "aws_appsync_resolver" "change_password_resolver" {
  api_id      = var.app_id
  field       = "changePassword"
  type        = "Mutation"
  data_source = aws_appsync_datasource.lambda_change_password_datasource.name
}
