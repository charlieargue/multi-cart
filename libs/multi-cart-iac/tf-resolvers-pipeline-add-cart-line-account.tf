# 1) function: get-account
# 2) function: get-cart
# 3) function: add-cart-line-account
# PIPELINE-RESPONE ===> filter and just return one cartline ACCOUNT


# PIPELINE 
# TODO: security and other todos: const foundCart = await Cart.findOne(foundCartLine?.cartId, {
#     where: {
#         userId: req.session.userId,
#     }
# });

# TODO: const hasSufficientFunds: boolean = (foundAccount.amountRemaining - amount > 0);
# if (!hasSufficientFunds) {
#     throw new Error(`Insufficient Account Funds: FUND: ${foundAccount.accountNumber}, NAME: ${foundAccount.accountName}, REQUEST AMOUNT: $${amount}, REMAINING: $${foundAccount.amountRemaining}`);
# }
resource "aws_appsync_resolver" "add_cart_line_account_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "addCartLineAccount"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/cart-resolvers/addCartLineAccount/pipeline/response-mapping.vtl")
  pipeline_config {
    functions = [
      "${aws_appsync_function.get_cart_function.function_id}",
      "${aws_appsync_function.get_account_function.function_id}",
      "${aws_appsync_function.add_cart_line_account_function.function_id}",
    ]
  }
}







