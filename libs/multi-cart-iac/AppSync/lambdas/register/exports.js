"use strict"
const {
    POOL_ID,
    CLIENT_ID
} = process.env
const {
    AWS_REGION_VAR
} = process.env
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider') // Much smaller size
const cognito = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: AWS_REGION_VAR
})

// thx: https://dev.to/franzwong/howto-implement-user-sign-up-and-login-with-aws-cognito-boa
exports.handler = async (event, context, callback) => {
    const username = event.username
    const email = event.email
    const password = event.password

    try {
        await cognito.adminCreateUser({
            UserPoolId: POOL_ID,
            Username: username,
            MessageAction: 'SUPPRESS',
            TemporaryPassword: password,
        }).promise()

        const initAuthResponse = await cognito.adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: CLIENT_ID,
            UserPoolId: POOL_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        }).promise()

        if (initAuthResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
            await cognito.adminRespondToAuthChallenge({
                ChallengeName: 'NEW_PASSWORD_REQUIRED',
                ClientId: CLIENT_ID,
                UserPoolId: POOL_ID,
                ChallengeResponses: {
                    USERNAME: email,
                    NEW_PASSWORD: password,
                },
                Session: initAuthResponse.Session
            }).promise()
        }
        
        console.log("✅ ✅ ✅ ✅ ✅ ✅ ✅  ~ REGISTER 😀 SUCCESS!")
        console.log(`🚀 ~ initAuthResponse`, initAuthResponse);

    } catch (err) {
        throw err
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

