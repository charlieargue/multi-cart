// VIP: don't forget to add to iam_role_policy_for_lambda!
output "function_arn" {
    value = aws_lambda_function.lambda_forgot_password_function.arn
}
output "appsync_function_id" {
    value = aws_appsync_function.lambda_forgot_password_appsync_function.function_id
}