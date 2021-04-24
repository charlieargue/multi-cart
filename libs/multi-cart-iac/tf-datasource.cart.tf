
# CART DYNAMODB DATASOURCE
resource "aws_appsync_datasource" "multicart_dynamodb_cart_datasource" {
  api_id           = aws_appsync_graphql_api.MultiCartPOC.id
  name             = "multicart_dynamodb_cart_datasource"
  service_role_arn = aws_iam_role.iam_role_for_dynamo.arn
  type             = "AMAZON_DYNAMODB"
  dynamodb_config {
    table_name = aws_dynamodb_table.cart_dynamo_table.name
  }
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
  ]
}

## CART TABLE
resource "aws_dynamodb_table" "cart_dynamo_table" {
  name           = "CartTable"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }
}



