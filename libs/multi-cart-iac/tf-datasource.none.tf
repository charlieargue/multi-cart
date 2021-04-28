
# NONE DATASOURCE
resource "aws_appsync_datasource" "none_datasource" {
  api_id = aws_appsync_graphql_api.MultiCartPOC.id
  name   = "none_datasource"
  type   = "NONE"
  depends_on = [
    aws_appsync_graphql_api.MultiCartPOC,
  ]
}
