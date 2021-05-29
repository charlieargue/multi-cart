##################################################################################
# NOTE: this is to allow UN-AUTHENTICATED access to endpoints, such as login/register/forgot|changePassword
#       this replaces the temporary x-api-key approach
##################################################################################

## ------------------------------
# thx: https://github.com/aws-amplify/amplify-cli/issues/1576#issuecomment-507467641
# thx: https://stackoverflow.com/questions/48451755/terraform-definition-of-cognito-identity-pool-auth-unauth-roles
# thx: https://stackoverflow.com/questions/48174927/public-queries-and-mutations-no-authentication
# thx: https://eddielh.medium.com/the-missing-guide-to-aws-amplify-public-and-private-access-for-authenticated-and-unauthenticated-2f192cc91391
## ------------------------------


## ------------------------------ IDENTITY POOL
resource "aws_cognito_identity_pool" "multicart_app_identity_pool" {
  identity_pool_name               = "${local.common_tags.AppPrefix}cognito_identity_pool_${local.common_tags.Environment}"
  allow_unauthenticated_identities = true # this POOL is ONLY to allow client/web apps to access the PUBLIC ENDPOINTS

  cognito_identity_providers {
    # TODO: not sure if I should use the same user_pool_client or create a new one? CONFUSION: creating a new one still ties it to the old user_pool, 
    # or I would have to create a new user pool just for this identity pool? That kind of makes sense actually....
    # where will the AppClient "users" go if there isn't another pool???
    client_id               = aws_cognito_user_pool_client.multicart_app_user_pool_client.id
    provider_name           = aws_cognito_user_pool.multicart_app_user_pool.endpoint
    server_side_token_check = true
  }
}

## ------------------------------ ROLES ATTACHMENT
resource "aws_cognito_identity_pool_roles_attachment" "multicart_app_identity_pool_roles_attachment" {
  identity_pool_id = aws_cognito_identity_pool.multicart_app_identity_pool.id

  roles = {
    unauthenticated = aws_iam_role.unauth_iam_role.arn
  }
}


## ------------------------------ UNAUTHENTICATED ROLE
resource "aws_iam_role" "unauth_iam_role" {
  name = "${local.common_tags.AppPrefix}unauth_iam_role_${local.common_tags.Environment}"
  assume_role_policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Action : "sts:AssumeRole",
        Principal : {
          Federated : "cognito-identity.amazonaws.com"
        },
        Effect : "Allow",
        Sid : ""
      }
    ]
  })
}

## ------------------------------ UNAUTHENTICATED POLICY
resource "aws_iam_role_policy" "web_iam_unauth_role_policy" {
  name = "${local.common_tags.AppPrefix}web_iam_unauth_role_policy_${local.common_tags.Environment}"
  role = aws_iam_role.unauth_iam_role.id
  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version : "2012-10-17",
    Statement : [
      {
        Sid : "",
        Action : "*",
        Effect : "Deny",
        Resource : "*"
      }
    ]
  })
}
