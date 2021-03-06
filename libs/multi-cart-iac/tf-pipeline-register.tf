## GAMEPLAN:
## -------------------------------------
##  1) hit cognito and create the user via Lambda (COGNITO will do unique check on BOTH username and email)
##  2) do unique constraints "manually" with get user call
#       🧠 ATTENTION: DDB does not natively support UNIQUE CONSTRAINTS (well, it does if you PK or multi-record it)
##  3) return new DDB user + token


# PIPELINE resolver
resource "aws_appsync_resolver" "register_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "register"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-USER+TOKEN.vtl")
  pipeline_config {
    functions = [
      "${module.register.appsync_function_id}",
      "${aws_appsync_function.get_user_function.function_id}",
      "${aws_appsync_function.add_user_function.function_id}",
    ]
  }
}
