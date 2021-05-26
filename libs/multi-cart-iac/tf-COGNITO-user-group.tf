# thx: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_group
## ------------------------------
resource "aws_iam_role" "multicart_app_user_group_role" {
  name               = "${local.common_tags.AppPrefix}cognito_user_group_role_${local.common_tags.Environment}"
  assume_role_policy = file("./AppSync/policies-roles/Cognito/role.json")
}

## ------------------------------
resource "aws_cognito_user_group" "multicart_app_user_group" {
  name         = "User"
  user_pool_id = aws_cognito_user_pool.multicart_app_user_pool.id
  description  = "Default User group (all users must belong to this group)"
  role_arn     = aws_iam_role.multicart_app_user_group_role.arn
}

## ------------------------------
resource "aws_cognito_user_group" "multicart_app_admin_group" {
  name         = "Admin"
  user_pool_id = aws_cognito_user_pool.multicart_app_user_pool.id
  description  = "Admin group (only select users)"
  role_arn     = aws_iam_role.multicart_app_user_group_role.arn
}
