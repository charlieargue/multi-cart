## GAMEPLAN:
## -------------------------------------
##  1) hit cognito and create the user w/ new password CHALLENGE flow
##  2) post confirmation trigger -> create that same user in DynamoDB
##  3) return new DDB user + token as UserResponse




# PIPELINE resolver
resource "aws_appsync_resolver" "register_pipeline_resolver" {
  kind              = "PIPELINE"
  api_id            = aws_appsync_graphql_api.MultiCart.id
  field             = "register"
  type              = "Mutation"
  request_template  = file("./AppSync/resolvers/_generic/generic-request-mapping-EMPTY.vtl")
  response_template = file("./AppSync/resolvers/user-resolvers/register/pipeline/response-mapping.vtl")
  pipeline_config {
    functions = [
      "${module.register.appsync_function_id}", // 1) setup COGNITO user
      

      # "${aws_appsync_function.get_user_function.function_id}",
    ]
  }
}



# # TODO: security and other todos
# # TODO: how is this returning a UserResponse? where is the .user / .error nesting happening?
# resource "aws_appsync_resolver" "register_user_resolver" {
#   data_source       = aws_appsync_datasource.multicart_dynamodb_user_datasource.name
#   request_template  = file("./AppSync/resolvers/user-resolvers/register/request-mapping.vtl")
#   response_template = file("./AppSync/resolvers/_generic/generic-response-mapping-item-SINGULAR.vtl")
#   depends_on = [
#     aws_appsync_graphql_api.MultiCart,
#     aws_appsync_datasource.multicart_dynamodb_user_datasource,
#   ]
# }