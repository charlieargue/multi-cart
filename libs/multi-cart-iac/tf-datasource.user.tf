
# USER DYNAMODB DATASOURCE
resource "aws_appsync_datasource" "multicart_dynamodb_user_datasource" {
  api_id           = aws_appsync_graphql_api.MultiCart.id
  name             = "multicart_dynamodb_user_datasource"
  service_role_arn = aws_iam_role.iam_role_for_dynamo.arn
  type             = "AMAZON_DYNAMODB"
  dynamodb_config {
    table_name = aws_dynamodb_table.user_dynamo_table.name
  }
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
  ]
}

## USER TABLE
resource "aws_dynamodb_table" "user_dynamo_table" {
  name           = "UserTable_${local.common_tags.Environment}"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "username"
    type = "S"
  }
  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name            = "UsernameIndex"
    hash_key        = "username"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }
  
  global_secondary_index {
    name            = "UsernameIndex"
    hash_key        = "email"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }
}



