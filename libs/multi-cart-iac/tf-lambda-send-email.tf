## ------------------------------
## Lambda Resources
## • archive/zip of files
## • function 
## • datasource (wrapping the function)
## ------------------------------


## ARCHIVE/ZIP
data "archive_file" "lambda_send_email_archive" {
  type        = "zip"
  source_dir  = "./iac/AppSync/lambdas/sendEmail"
  output_path = "./build/MultiCartPOC_lambda_send_email.zip"
}

# LAMBDA ƛ
// TODO: pass in variable
resource "aws_lambda_function" "lambda_send_email_function" {
  filename         = data.archive_file.lambda_send_email_archive.output_path
  function_name    = "lambda_send_email_function"
  role             = aws_iam_role.iam_role_for_lambda.arn
  handler          = "exports.handler"
  source_code_hash = data.archive_file.lambda_send_email_archive.output_base64sha256
  runtime          = "nodejs12.x"
  publish          = true
  environment {
    variables = {
      aws_region = var.aws_region
    }
  }
  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
  ]
}

