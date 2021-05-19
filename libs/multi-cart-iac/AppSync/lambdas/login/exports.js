
"use strict"
// const {
//     USERNAME,
//     PASSWORD,
//     POOL_ID,
//     CLIENT_ID
// } = process.env;
const AWS = require('aws-sdk');

// thx: https://docs.aws.amazon.com/cognito/latest/developerguide/authentication.html
// thx: https://dzone.com/articles/authentication-and-authorization-to-amazon-cognito
exports.handler = async (event, context, callback) => {
    console.log("👍👍👍👍👍👍👍👍👍👍👍 ~ event", event) // event has PAYLOAD, and we put whatever we want in there


    // // // Amazon Cognito creates a session which includes the id, access, and refresh tokens of an authenticated user.

    // var authenticationData = {
    //     Username: USERNAME,
    //     Password: PASSWORD,
    // };
    // var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    // var poolData = {
    //     UserPoolId: POOL_ID,
    //     ClientId: CLIENT_ID
    // };
    // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    // var userData = {
    //     Username: USERNAME,
    //     Pool: userPool
    // };
    // var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    // cognitoUser.authenticateUser(authenticationDetails, {
    //     onSuccess: function (result) {
    //         var accessToken = result.getAccessToken().getJwtToken();

    //         /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
    //         var idToken = result.idToken.jwtToken;
    //     },

    //     onFailure: function (err) {
    //         alert(err);
    //     },

    // });

}

