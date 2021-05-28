"use strict"
const {
    POOL_ID,
    CLIENT_ID,
    AWS_REGION_VAR
} = process.env;
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider') // Much smaller size
const cognito = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: AWS_REGION_VAR
});
const AWS = require('aws-sdk');

// thx: https://stackoverflow.com/questions/38110615/how-to-allow-my-user-to-reset-their-password-on-cognito-user-pools
// thx: https://stackoverflow.com/questions/38110615/how-to-allow-my-user-to-reset-their-password-on-cognito-user-pools
exports.handler = async (event, context, callback) => {

    /*
    Change Password Flow (step #2 of forgot password flow)
    --------------------------------------------------------------------------------------------------
    
    */

    const token = event.arguments.token;
    const newPassword = event.arguments.newPassword;
    const poolData = { UserPoolId: POOL_ID, ClientId: CLIENT_ID };
    const userPool = new AWS.AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    console.log(`🚀 ~ token`, token);
    console.log(`🚀 ~ newPassword`, newPassword);
    console.log(`🚀 ~ poolData`, poolData);
    console.log(`🚀 ~ userPool`, userPool);

    // setup cognitoUser first
    const cognitoUser = new cognito.CognitoUser({
        Username: "karlgolka", // 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 🔴 
        Pool: userPool
    });
    console.log(`🚀 ~ cognitoUser`, cognitoUser);
    
    cognitoUser.confirmPassword(token, newPassword, {
        onFailure(err) {
            console.log(err);
        },
        onSuccess() {
            console.log("✅ ✅ ✅ ✅ ✅ ✅ Success");
        },
    });








    // try {

    //     const data = await cognito.confirmPassword(token, newPassword).promise();
    //     console.log(`🚀 ~ data`, data);

    //     return true

    // } catch (err) {
    //     console.log(err, err.stack);
    // }
}