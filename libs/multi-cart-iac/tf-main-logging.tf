# appsync logging (w/ assumed roles/IAM for cloudwatch)
resource "aws_iam_role" "multicart_appsync_logging_role" {
  name               = "multicart_appsync_logging_role"
  assume_role_policy = file("./iac/AppSync/policies-roles/AppSync/logging_role_policy.json")
}
resource "aws_iam_role_policy_attachment" "appsync_logging_role_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppSyncPushToCloudWatchLogs"
  role       = aws_iam_role.multicart_appsync_logging_role.name
  depends_on = [
    aws_iam_role.multicart_appsync_logging_role,
  ]
}