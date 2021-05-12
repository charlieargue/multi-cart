# 1) function: get-cart
# 2) function: delete cart line account (get cl IDX -> cla IDX)
# PIPELINE-RESPONE ===> true/boolean


# PIPELINE 
# TODO: security and other todos, see original Node.js resolver
resource "aws_appsync_resolver" "delete_cart_line_account_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "deleteCartLineAccount"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/cart-resolvers/deleteCartLineAccount/pipeline/response-mapping.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.get_cart_function.function_id}",
      "${aws_appsync_function.delete_cart_line_account_function.function_id}",
    ]
  }
}







