# TODO: perhaps a separate role for the AppClients group?
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
  description  = "Admin group for admin-only functions, like hydrating accounts (only select users)"
  role_arn     = aws_iam_role.multicart_app_user_group_role.arn
}

## ------------------------------ ATTN: part of app_client POOL
resource "aws_cognito_user_group" "multicart_app_app_client_group" {
  name         = "AppClient"
  user_pool_id = aws_cognito_user_pool.multicart_app_client_pool.id
  description  = "AppClient group (allows applications/clients access the public API endpoints, like login/register/etc.)"
  role_arn     = aws_iam_role.multicart_app_user_group_role.arn
}
