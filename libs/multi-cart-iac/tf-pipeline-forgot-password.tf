#✅forgotPassword(email: String!): Boolean!
#✅ const user = await User.findOne({ where: { email } });


# TODO: this needs to go as the 2nd STEP/FUNCTION
# EG: like the request-mapping for the 2nd step SESSION stuff would check if it has a user, etc...
# if (!user) {
#     // email is not in DB
#     //... 🛡 but for security reasons...
#     //    🛡 maybe just return true so they can't sniff for emails and PHISH!
#     return true; // or false... do nothing
# }
# + SESSIN STUFF:
# // TODO: RIP out old redis library and just need io-redis?
# const token = v4(); // guid
# // use redis to store these tokens
# await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, 'ex', 1000 * 60 * 60 * 24 * 3); // 3 days validity


# AND THE 3rd FUNCTION
# // send them a special LINK w/ token
# await sendEmail(
#     email,
#     `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
# );
# return true;

## GAMEPLAN:
## -------------------------------------
## 1) A - find user EXISTING FUNCTION, if not exist ERROR, if exist, pass to B



# PIPELINE 
resource "aws_appsync_resolver" "forgot_password_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "forgotPassword"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/user-resolvers/forgotPassword/pipeline/response-mapping.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.get_user_function.function_id}",
      "${module.send_email.appsync_function_id}",
    ]
  }
}







