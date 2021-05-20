output "function_arn" {
    value = aws_lambda_function.lambda_login_function.arn
}
output "function_id" {
    value = aws_appsync_function.lambda_login_appsync_function.function_id
}