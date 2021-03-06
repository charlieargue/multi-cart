##################################################################################
# VARIABLES
##################################################################################
variable "AWS_REGION" { default = "us-west-2" }
variable "ORGANIZATION_NAME" { default = "multi-cart" }
variable "ENVIRONMENT" { default = "dev" }


##################################################################################
# LOCALS
##################################################################################
locals {

  # NOTE: does not work in TF CLOUD (but could be useful locally)
  # assert_not_default_workspace = terraform.workspace == "default" ? file("ERROR: default workspace not allowed") : null

  common_tags = {
    OrgName     = "${var.ORGANIZATION_NAME}"
    Environment = "${var.ENVIRONMENT}"
    AppPrefix   = "multicart_",
  }
}
