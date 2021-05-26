#   data_source       = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
#   request_template  = file("./AppSync/resolvers/user-resolvers/updateUser/request-mapping.vtl")
#   response_template = file("./AppSync/resolvers/user-resolvers/updateUser/response-mapping.vtl")




# TODO: owner security!
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







