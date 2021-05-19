##################################################################################
# OUTPUTS
##################################################################################
output "function_arn" {
    value = aws_lambda_function.lambda_send_email_function.arn
}
output "function_id" {
    value = aws_appsync_function.lambda_send_email_appsync_function.function_id
}