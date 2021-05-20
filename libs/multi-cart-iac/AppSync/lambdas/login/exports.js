"use strict"
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

// thx: https://stackoverflow.com/questions/48313291/using-aws-cognito-in-a-lambda-function-with-npm
// thx: https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html#amazon-cognito-user-pools-server-side-authentication-flow
// big-thx: https://dev.to/franzwong/howto-implement-user-sign-up-and-login-with-aws-cognito-boa
exports.handler = async (event, context, callback) => {
    const usernameOrEmail = event.usernameOrEmail
    const password = event.password
    try {

        const data = await cognito.adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: CLIENT_ID,
            UserPoolId: POOL_ID,
            AuthParameters: {
                USERNAME: usernameOrEmail,
                PASSWORD: password,
            },
        }).promise();
        console.log("✅ ✅ ✅ ✅ ✅ ✅ ✅  ~ GREAT SUCCESS!");
        console.log(data);
        
       return {
           token: data.AuthenticationResult.AccessToken
       }
    } catch (err) {
        console.log(err, err.stack);
    }   
}

/* 
        FYI - RESPONSE SYNTAX:
        {
            "AuthenticationResult": { 
                "AccessToken": "string",
                "ExpiresIn": number,
                "IdToken": "string",
                "NewDeviceMetadata": { 
                    "DeviceGroupKey": "string",
                    "DeviceKey": "string"
                },
                "RefreshToken": "string",
                "TokenType": "string"
            },
            "ChallengeName": "string",
            "ChallengeParameters": { 
                "string" : "string" 
            },
            "Session": "string"
            }
        */

