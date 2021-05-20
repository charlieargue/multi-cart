##################################################################################
# VARIABLES
##################################################################################
variable "role_arn" { default = "" }
variable "aws_region" { default = "" }
variable "app_id" { default = "" }
variable "common_tags" { default = "" }
variable "lambda_request_vtl" { default = "" }
variable "lambda_response_vtl" { default = "" }
variable "pool_id" { default = "" }
variable "client_id" { default = "" }

##################################################################################
# LOCALS
##################################################################################
locals {
  filename = "MultiCart_lambda_register.zip"
}

