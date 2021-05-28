

# PIPELINE resolver
resource "aws_appsync_resolver" "forgot_password_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "forgotPassword"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-PREV-RESULT.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.get_user_function.function_id}",
      "${module.forgot_password.appsync_function_id}",
    ]
  }
}

