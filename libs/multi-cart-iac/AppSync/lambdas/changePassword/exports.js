"use strict"
const {
    AWS_REGION_VAR
} = process.env;
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider') // Much smaller size
const cognito = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: AWS_REGION_VAR
});

// thx: https://stackoverflow.com/questions/38110615/how-to-allow-my-user-to-reset-their-password-on-cognito-user-pools
exports.handler = async (event, context, callback) => {

    /*
    Change Password Flow (step #2 of forgot password flow)
    --------------------------------------------------------------------------------------------------
    
    */

    const token = event.arguments.token;
    const newPassword = event.arguments.newPassword;
    
    console.log(`🚀 ~ token`, token);
    console.log(`🚀 ~ newPassword`, newPassword);



    try {

        const data = await cognito.confirmPassword(token, newPassword).promise();
        console.log(`🚀 ~ data`, data);

        return true

    } catch (err) {
        console.log(err, err.stack);
    }
}