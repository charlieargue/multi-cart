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
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "login"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-USER+TOKEN.vtl")
  pipeline_config {
    functions = [
      "${module.login.appsync_function_id}",
      "${aws_appsync_function.get_user_function.function_id}",
    ]
  }
}

