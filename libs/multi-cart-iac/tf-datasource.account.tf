
# ACCOUNT DYNAMODB DATASOURCE
resource "aws_appsync_datasource" "multicart_dynamodb_account_datasource" {
  api_id           = aws_appsync_graphql_api.MultiCart.id
  name             = "multicart_dynamodb_account_datasource"
  service_role_arn = aws_iam_role.iam_role_for_dynamo.arn
  type             = "AMAZON_DYNAMODB"
  dynamodb_config {
    table_name = aws_dynamodb_table.account_dynamo_table.name
  }
  depends_on = [
    aws_appsync_graphql_api.MultiCart,
  ]
}

## ACCOUNT TABLE
resource "aws_dynamodb_table" "account_dynamo_table" {
  name           = "AccountTable_${local.common_tags.Environment}"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "accountNumber"
    type = "S"
  }
  
  attribute {
    name = "accountName"
    type = "S"
  }

  global_secondary_index {
    name            = "AccountNumberIndex"
    hash_key        = "accountNumber"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }
  
  global_secondary_index {
    name            = "AccountNameIndex"
    hash_key        = "accountName"
    write_capacity  = 1
    read_capacity   = 1
    projection_type = "ALL"
  }
}



