
# TODO: owner security!
# TODO: there should really be a "me" endpoint, and this should be called "updateMe"
# PIPELINE 
# (UPDATE) USER - just currentCartId
resource "aws_appsync_resolver" "update_user_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "updateUser"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.me_function.function_id}",
      "${aws_appsync_function.update_user_function.function_id}",
    ]
  }
}







