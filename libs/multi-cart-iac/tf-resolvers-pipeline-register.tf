## GAMEPLAN:
## -------------------------------------
##  1) hit cognito and create the user w/ new password CHALLENGE flow
##  2) NO! USE CLOUD NATIVE and PIPLINE... post confirmation trigger -> create that same user in DynamoDB
##  3) return new DDB user + token as UserResponse




# PIPELINE resolver
resource "aws_appsync_resolver" "register_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "register"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/user-resolvers/register/pipeline/response-mapping.vtl")
  pipeline_config {
    functions = [
      "${module.register.appsync_function_id}", // 1) setup COGNITO user
      "${aws_appsync_function.add_user_function.function_id}",
      // 2) PUTITEM into DDB (and return with token from step 1)
    ]
  }
}
