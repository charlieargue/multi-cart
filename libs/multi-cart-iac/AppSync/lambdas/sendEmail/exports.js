// 🔴
// 🔴 ATTENTION: while in non-production mode, in SES Sandbox, can only send emails to/from karl@multicart.app!
// 🔴
// 🔴

"use strict"
const {
  AWS_REGION_VAR
} = process.env;
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: AWS_REGION_VAR });

// --------------
// thx: https://stackoverflow.com/questions/57944675/aws-appsync-how-to-send-an-email-after-a-mutation
// --------------
exports.handler = async (event, context, callback) => {
  console.log("🚀 ~ event", event) // event has PAYLOAD, and we put whatever we want in there
  const fromEmail = "karl@multicart.app"
  const user = event.user
  // TODO: abstract these to receive from even.inputs so can re-use this lambda in future
  const subject = "💎 Change Password"
  const token = "WIP"
  const link = `<a href="http://multicart.app/change-password/${token}">reset password</a>`
  if (user) {
    const bccEmailAddresses = []
    const ccEmailAddresses = []
    const toEmailAddresses = [user.email]
    const bodyData = "Testing, testing, 1, 2, 3 <br />" + link
    const bodyCharset = "UTF-8"
    const subjectData = subject
    const subjectCharset = "UTF-8"
    const sourceEmail = fromEmail
    const replyToAddresses = []

    const emailParams = {
      Destination: {
        BccAddresses: bccEmailAddresses,
        CcAddresses: ccEmailAddresses,
        ToAddresses: toEmailAddresses,
      },
      Message: {
        Body: {
          Html: {
            Data: bodyData,
            Charset: bodyCharset,
          },
        },
        Subject: {
          Data: subjectData,
          Charset: subjectCharset,
        },
      },
      Source: sourceEmail,
      ReplyToAddresses: replyToAddresses,
    }

    await ses.sendEmail(emailParams).promise()
  }
}
