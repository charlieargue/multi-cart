## ------------------------------
# thx: https://johncodeinaire.com/aws-cognito-terraform-tutorial/
# thx: https://github.com/mineiros-io/terraform-aws-cognito-user-pool/blob/master/examples/complete/main.tf
## ------------------------------
resource "aws_cognito_user_pool" "multicart_app_user_pool" {
  # This is choosen when creating a user pool in the console
  name = "${local.common_tags.AppPrefix}cognito_user_pool_${local.common_tags.Environment}"

  # ATTRIBUTES
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

  # MESSAGE CUSTOMIZATIONS
  verification_message_template {
    default_email_option  = "CONFIRM_WITH_LINK"
    email_message_by_link = "💎 Register with 🛍 Multi Cart: {##Click Here##}"
    email_subject_by_link = "💎 Register Link for 🛍 Multi Cart"
  }
  email_configuration {
    reply_to_email_address = "karl@multicart.app"
  }

  # DEVICES
  device_configuration {
    challenge_required_on_new_device      = true
    device_only_remembered_on_user_prompt = true
  }
}


# DOMAIN NAME
resource "aws_cognito_user_pool_domain" "multicart_app_user_pool_domain" {
  user_pool_id = "${aws_cognito_user_pool.multicart_app_user_pool.id}"
  # DOMAIN PREFIX
  domain = "${local.common_tags.OrgName}-${local.common_tags.Environment}"
}

# CLIENT
resource "aws_cognito_user_pool_client" "multicart_app_user_pool_client" {
  user_pool_id = "${aws_cognito_user_pool.multicart_app_user_pool.id}"

  # APP CLIENTS
  name                   = "${local.common_tags.AppPrefix}webclient"
  refresh_token_validity = 30
#   read_attributes  = ["username"]
#   write_attributes = ["username"]

  # APP INTEGRATION -
  # APP CLIENT SETTINGS
  supported_identity_providers = ["COGNITO"]
  callback_urls                = ["https://www.multicart.app"]
  logout_urls                  = ["https://www.multicart.app/login"]
}