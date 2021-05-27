// VIP: don't forget to add to iam_role_policy_for_lambda!
output "function_arn" {
    value = aws_lambda_function.lambda_cognito_email_customizations_function.arn
}