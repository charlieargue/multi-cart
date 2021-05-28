## ------------------------------
# thx: https://johncodeinaire.com/aws-cognito-terraform-tutorial/
# thx: https://github.com/mineiros-io/terraform-aws-cognito-user-pool/blob/master/examples/complete/main.tf
# thx: STANDARD ATTRIBUTES for USERS in POOL: 
#       - https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html#cognito-user-pools-standard-attributes
# thx: https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_UserPoolType.html
## ------------------------------
resource "aws_cognito_user_pool" "multicart_app_user_pool" {
  # This is choosen when creating a user pool in the console
  name = "${local.common_tags.AppPrefix}cognito_user_pool_${local.common_tags.Environment}"

  # ATTRIBUTES
  # username_attributes = ["email"] # NO, not like this! we still want a username (this makes a GUID username and you can login with your email)

  # DOCS: The email address, phone number, and preferred username attributes can be marked as aliases. 
  # For example, if email and phone are selected as aliases for a user pool, 
  # users in that user pool can sign in using their username, email address, or phone number, along with their password.
  alias_attributes = ["email"]

  # POLICY
  password_policy {
    minimum_length    = "8"
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  # MFA & VERIFICATIONS
  mfa_configuration        = "OFF"
  auto_verified_attributes = ["email"]

  # MESSAGE CUSTOMIZATIONS via lambda triggers
  lambda_config {
    custom_message = module.cognito_email_customizations.function_arn
  }
  depends_on = [
    module.cognito_email_customizations.function_arn
  ]

}


# DOMAIN NAME
resource "aws_cognito_user_pool_domain" "multicart_app_user_pool_domain" {
  user_pool_id = aws_cognito_user_pool.multicart_app_user_pool.id
  # DOMAIN PREFIX
  domain = "${local.common_tags.OrgName}-${local.common_tags.Environment}"
}

# CLIENT
resource "aws_cognito_user_pool_client" "multicart_app_user_pool_client" {
  user_pool_id = aws_cognito_user_pool.multicart_app_user_pool.id

  # APP CLIENTS
  name = "${local.common_tags.AppPrefix}webclient_${local.common_tags.Environment}"

  # APP CLIENT SETTINGS
  supported_identity_providers         = ["COGNITO"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["aws.cognito.signin.user.admin"]
  allowed_oauth_flows                  = ["implicit"]
  explicit_auth_flows                  = ["ADMIN_NO_SRP_AUTH"]

  # NO! generate_secret                      = true
  read_attributes        = ["email"] # DECOMISH: this did NOT help get email in $ctx.identity<.email>
  refresh_token_validity = 30        # in days
  access_token_validity  = 24    # in hours (1 day is MAX)

  # FYI: 🛡 later lock down with prevent_user_existence_errors  = true, but prolly wont matter since handling errors on our own afaik
}
