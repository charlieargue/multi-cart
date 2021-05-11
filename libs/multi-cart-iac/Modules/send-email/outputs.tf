##################################################################################
# OUTPUTS
##################################################################################
output "data_source_name" {
    value = aws_appsync_datasource.lambda_send_email_datasource.name
}
output "function_arn" {
    value = aws_lambda_function.lambda_send_email_function.arn
}