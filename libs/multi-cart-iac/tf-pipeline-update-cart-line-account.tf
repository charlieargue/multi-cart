# 1) function: get-account
# 2) function: get-cart
# 3) function: update-cart-line-account
# PIPELINE-RESPONE ===> filter and just return one cartline ACCOUNT

# PIPELINE 
# TODO: security and other todos: see original resolver
# // TODO: change the input variable $id to be $cartLineAccountId for constitency
resource "aws_appsync_resolver" "update_cart_line_account_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "updateCartLineAccount"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-cartline-SINGULAR-normalized.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.get_cart_function.function_id}",
      "${aws_appsync_function.get_account_function.function_id}",
      "${aws_appsync_function.update_cart_line_account_function.function_id}",
    ]
  }
}







