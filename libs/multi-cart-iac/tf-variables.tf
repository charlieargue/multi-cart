##################################################################################
# VARIABLES
##################################################################################
variable "aws_region" { default = "" }


##################################################################################
# LOCALS
##################################################################################
locals {
  env_name                     = "dev" # 🔴 HARD CODED TEMP!
  # env_name                     = lower(terraform.workspace) # a nice lowercase version, in case I ever switch actual workspace names
  assert_not_default_workspace = terraform.workspace == "default" ? file("ERROR: default workspace not allowed") : null

  common_tags = {
    OrgName     = "multi-cart" # for TF Cloud
    Environment = local.env_name
    AppPrefix   = "multicart_"
  }
}
