## GAMEPLAN:
## -------------------------------------
## 1) break this up into a pipeline resolver: A -> B/C
## 2) A - find user, if not exist ERROR, if exist, pass to B

## TODO:
## 3) B - if got input user, verify pwd, if fail ERROR, if ok, pass user to C
##    4) C - (maybe combine w/ B), log user in (session) and return user!



# PIPELINE resolver
resource "aws_appsync_resolver" "login_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "login"
  type              = "Mutation"
  request_template  = file("./iac/AppSync/resolvers/user-resolvers/login/pipeline/request-mapping.vtl")
  response_template = file("./iac/AppSync/resolvers/user-resolvers/login/pipeline/response-mapping.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.get_user_function.function_id}", # A
      # B
    ]
  }
}
