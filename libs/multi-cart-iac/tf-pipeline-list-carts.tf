

# PIPELINE resolver
resource "aws_appsync_resolver" "list_carts_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "carts"
  type              = "Query"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-items.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.me_function.function_id}",
      "${aws_appsync_function.list_carts_function.function_id}",
    ]
  }
}

