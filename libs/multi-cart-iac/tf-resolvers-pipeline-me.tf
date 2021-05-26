
# PIPELINE resolver
resource "aws_appsync_resolver" "me_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "me"
  type              = "Query"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  pipeline_config {
    functions = [
      # NOTE: reason for doing me as a pipeline is so that it becomes a re-usable function!
      "${aws_appsync_function.me_function.function_id}",
    ]
  }
}

