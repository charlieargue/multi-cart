# TODO: owner security!
# PIPELINE 
resource "aws_appsync_resolver" "blank_cart_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "blankCart"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.me_function.function_id}",
      "${aws_appsync_function.blank_cart_function.function_id}",
    ]
  }
}







