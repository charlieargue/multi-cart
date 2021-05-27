"use strict"
const {
    AWS_REGION_VAR
} = process.env;
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider') // Much smaller size
const cognito = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: AWS_REGION_VAR
});

// thx: https://stackoverflow.com/questions/58729214/how-to-use-forgot-password-custom-template-on-net-using-aws-cognito
exports.handler = async (event, context, callback) => {
    console.log(`🔴 🔴 🔴 🔴 🔴 🔴  ~ event`, event);

    /*
    COGNITO EMAIL CUSTOMIZATIONS
    --------------------------------------------------------------------------------------------------
    EVENT input:
    {
        version: '1',
        region: 'us-west-2',
        userPoolId: 'us-west-2_lvoAflAMD',
        userName: 'karlgolka',
        callerContext: {
            awsSdkVersion: 'aws-sdk-nodejs-2.880.0',
            clientId: '222i16dr373kusdh1dgqtoip1d'
        },
        triggerSource: 'CustomMessage_ForgotPassword',
        request: {
            userAttributes: {
            'cognito:token_nbf': '1622053080043',
            sub: 'e4b14fbf-4590-4246-b36f-6b29f70fb509',
            'cognito:email_alias': 'contact@karlgolka.com',
            'cognito:user_status': 'CONFIRMED',
            email_verified: 'true',
            email: 'contact@karlgolka.com'
            },
            codeParameter: '{####}',
            linkParameter: '{##Click Here##}',
            usernameParameter: null
        },
        response: { smsMessage: null, emailMessage: null, emailSubject: null }
        }    
    */

    if (event.triggerSource === 'CustomMessage_ForgotPassword') {
        event.response.emailSubject = "Multi Cart: Forgot Password Code";
        event.response.emailMessage = "Hi! <br/><br/>Your code is: " + event.request.codeParameter +
            "<br/><br/>Please visit this url and provide the requested information: https://www.multicart.app/change-password/1234";
    }

    // return to Amazon COGNITO
    callback(null, event)
}