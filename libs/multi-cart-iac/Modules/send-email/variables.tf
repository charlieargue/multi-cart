##################################################################################
# VARIABLES
##################################################################################
variable "role_arn" { default = "" }
variable "AWS_REGION" { default = "" }
variable "app_id" { default = "" }
variable "common_tags" { default = "" }

##################################################################################
# LOCALS
##################################################################################
locals {
  filename = "MultiCart_lambda_send_email.zip"
}

