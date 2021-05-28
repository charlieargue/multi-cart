"use strict"
const {
    CLIENT_ID,
    AWS_REGION_VAR
} = process.env;
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider') // Much smaller size
const cognito = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: AWS_REGION_VAR
});

// no thx: https://stackoverflow.com/questions/38110615/how-to-allow-my-user-to-reset-their-password-on-cognito-user-pools
// thx looking thru the docs! https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ConfirmForgotPassword.html
exports.handler = async (event, context, callback) => {
    /*
    Change Password Flow (step #2 of forgot password flow)
    --------------------------------------------------------------------------------------------------
    */

    const token = event.arguments.token;
    const newPassword = event.arguments.newPassword;
    const username = event.arguments.username;
    console.log(`🚀 ~ username`, username);


    try {

        // VIP: add it to the policy
        const data = await cognito.confirmForgotPassword({
            ClientId: CLIENT_ID,
            ConfirmationCode: token,
            Password: newPassword,
            Username: username

        }).promise();
        console.log(`🚀 ~ data`, data);

        return true

    } catch (err) {
        console.log(err, err.stack);
        throw err
    }
}
