##################################################################################
# VARIABLES
##################################################################################
variable "role_arn" { default = "" }
variable "aws_region" { default = "" }
variable "app_id" { default = "" }
variable "common_tags" { default = "" }

##################################################################################
# LOCALS
##################################################################################
locals {
  filename = "MultiCart_lambda_cognito_email_customizations.zip"
}

