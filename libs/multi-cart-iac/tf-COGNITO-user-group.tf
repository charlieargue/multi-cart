# thx: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cognito_user_group
## ------------------------------
# TODO: if works, move into .json file

# TODO: THAT STRINGEQUALS is wrong, hard-coded! 🔴🔴🔴🔴🔴🔴🔴
resource "aws_iam_role" "multicart_app_user_group_role" {
  name = "${local.common_tags.AppPrefix}cognito_user_group_role_${local.common_tags.Environment}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity"
    }
  ]
}
EOF
}

## ------------------------------
resource "aws_cognito_user_group" "multicart_app_user_group" {
  name         = "${local.common_tags.AppPrefix}user_group_${local.common_tags.Environment}"
  user_pool_id = "${aws_cognito_user_pool.multicart_app_user_pool.id}"
  description  = "Managed by Terraform"
  precedence   = 42
  role_arn     = aws_iam_role.multicart_app_user_group_role.arn
}
