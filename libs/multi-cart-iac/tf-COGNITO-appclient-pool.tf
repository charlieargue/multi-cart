## ------------------------------
# NOTE: this is the production/long-term version of using x-api-key and <authentication_type = "API_KEY">
## ------------------------------
resource "aws_cognito_user_pool" "multicart_app_client_pool" {
  name             = "${local.common_tags.AppPrefix}cognito_app_client_pool_${local.common_tags.Environment}"
  alias_attributes = ["email"]

  # 🛡 VIP: APP CLIENT only admin can create users
  admin_create_user_config {
    allow_admin_create_user_only = true
  }

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

}


# DOMAIN NAME
resource "aws_cognito_user_pool_domain" "multicart_app_client_pool_domain" {
  user_pool_id = aws_cognito_user_pool.multicart_app_client_pool.id
  # DOMAIN PREFIX
  domain = "${local.common_tags.OrgName}-app-client-${local.common_tags.Environment}"
}

# CLIENT
resource "aws_cognito_user_pool_client" "multicart_app_client_pool_client" {
  user_pool_id = aws_cognito_user_pool.multicart_app_client_pool.id

  # COGNITO's APP CLIENTS 
  name = "${local.common_tags.AppPrefix}webclient_app_client_${local.common_tags.Environment}"

  # APP CLIENT SETTINGS
  supported_identity_providers         = ["COGNITO"]
  callback_urls                        = ["https://www.multicart.app"]
  logout_urls                          = ["https://www.multicart.app/login"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes                 = ["aws.cognito.signin.user.admin"]
  allowed_oauth_flows                  = ["implicit"]
  explicit_auth_flows                  = ["ADMIN_NO_SRP_AUTH"]

  # NO! generate_secret                      = true
  read_attributes        = ["email"] # DECOMISH: this did NOT help get email in $ctx.identity<.email>
  refresh_token_validity = 30        # in days
  access_token_validity  = 24        # in hours (1 day is MAX)

  # 🛡 
  prevent_user_existence_errors = "ENABLED"
}
