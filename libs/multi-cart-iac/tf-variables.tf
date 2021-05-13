##################################################################################
# VARIABLES
##################################################################################
variable "AWS_REGION" { default = "" }
variable "ORGANIZATION_NAME" { default = "" }
variable "ENVIRONMENT" { default = "" }


##################################################################################
# LOCALS
##################################################################################
locals {
  
  # COOL: but not needed on TF Cloud anymore...
  # assert_not_default_workspace = terraform.workspace == "default" ? file("ERROR: default workspace not allowed") : null

  common_tags = {
    OrgName     = "${var.ORGANIZATION_NAME}"
    Environment = "${var.ENVIRONMENT}"
    AppPrefix   = "multicart_"
  }
}
