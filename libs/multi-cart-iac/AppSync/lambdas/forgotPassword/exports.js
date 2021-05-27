"use strict"
// DECOMISH
const {
    POOL_ID,
    CLIENT_ID
} = process.env;
const {
    AWS_REGION_VAR
} = process.env;
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider') // Much smaller size
const cognito = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: AWS_REGION_VAR
});

// thx: https://github.com/aws/aws-appsync-community/issues/68
exports.handler = async (event, context, callback) => {

    /*
    Password Recover Flow
    --------------------------------------------------------------------------------------------------
    
    */

    const email = event.email;
    console.log(`🚀 ~ email`, email);

    try {

        const data = await cognito.forgotPassword({
            ClientId: CLIENT_ID,
            Username: 'karlgolka'
        }).promise();
        console.log(`🚀 ~ data`, data);

        return true

    } catch (err) {
        console.log(err, err.stack);
    }
}