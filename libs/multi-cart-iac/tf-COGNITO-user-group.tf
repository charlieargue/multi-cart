# thx: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_group
## ------------------------------
resource "aws_iam_role" "multicart_app_user_group_role" {
  name               = "${local.common_tags.AppPrefix}cognito_user_group_role_${local.common_tags.Environment}"
  assume_role_policy = file("./AppSync/policies-roles/Cognito/role.json")
}

## ------------------------------
resource "aws_cognito_user_group" "multicart_app_user_group" {
  name = "Admin" # huh?
  # name         = "${local.common_tags.AppPrefix}user_group_${local.common_tags.Environment}"
  user_pool_id = aws_cognito_user_pool.multicart_app_user_pool.id
  description  = "Managed by Terraform"
  precedence   = 42
  role_arn     = aws_iam_role.multicart_app_user_group_role.arn

}
