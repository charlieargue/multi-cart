## ------------------------------
# thx: https://github.com/aws-amplify/amplify-cli/issues/1576#issuecomment-507467641
# thx: https://stackoverflow.com/questions/48451755/terraform-definition-of-cognito-identity-pool-auth-unauth-roles
# thx: https://stackoverflow.com/questions/48174927/public-queries-and-mutations-no-authentication
# thx: https://eddielh.medium.com/the-missing-guide-to-aws-amplify-public-and-private-access-for-authenticated-and-unauthenticated-2f192cc91391
## ------------------------------
 resource "aws_cognito_identity_pool" "multicart_app_identity_pool" {
      identity_pool_name               = "${local.common_tags.AppPrefix}cognito_identity_pool_${local.common_tags.Environment}"
      allow_unauthenticated_identities = true # this POOL is ONLY to allow client/web apps to access the PUBLIC ENDPOINTS

      cognito_identity_providers {
        # TODO: not sure if I should use the same user_pool_client or create a new one? CONFUSION: creating a new one still ties it to the old user_pool, 
        # or I would have to create a new user pool just for this identity pool? That kind of makes sense actually....
        # where will the AppClient "users" go if there isn't another pool???
           client_id               = aws_cognito_user_pool_client.multicart_app_user_pool_client.id
           server_side_token_check = true
      }
 }

