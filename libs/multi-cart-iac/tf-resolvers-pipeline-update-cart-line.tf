# # (UPDATE) CART LINE - just name for now
# # TODO: security and other todos
# resource "aws_appsync_resolver" "update_cart_resolver" {
#   api_id            = aws_appsync_graphql_api.MultiCartPOC.id
#   field             = "updateCart"
#   type              = "Mutation"
#   data_source       = aws_appsync_datasource.multicart_dynamodb_cart_datasource.name
#   request_template  = file("./iac/AppSync/resolvers/cart-resolvers/updateCart/request-mapping.vtl")
#   response_template = file("./iac/AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
#   depends_on = [
#     aws_appsync_graphql_api.MultiCartPOC,
#     aws_appsync_datasource.multicart_dynamodb_cart_datasource,
#   ]
# }


# 1) function: get-cart, pass entire cart w/ cartLines to delete function
# 2) function: delete: get the INDEX of the cartLine we want to delete, and UpdateItem>REMOVE


# PIPELINE 
# TODO: security and other todos
resource "aws_appsync_resolver" "update_cart_line_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCartPOC.id
  field             = "updateCartLine"
  type              = "Mutation"
  request_template  = file("./iac/AppSync/resolvers/cart-resolvers/updateCartLine/pipeline/request-mapping.vtl")
  response_template = file("./iac/AppSync/resolvers/cart-resolvers/updateCartLine/pipeline/response-mapping.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.get_cart_function.function_id}",
      "${aws_appsync_function.update_cart_line_function.function_id}",
    ]
  }
}







