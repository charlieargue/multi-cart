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
// > the password is passed as a temporary password. It means user needs to change on 1st login. 
// > But we don’t want to do this because the password is already provided by the user. We need to programmatically to change the password for them.
exports.handler = async (event, context, callback) => {
    const username = event.username
    const email = event.email
    const password = event.password

    try {
        const createdUser = await cognito.adminCreateUser({
            UserPoolId: POOL_ID,
            MessageAction: 'SUPPRESS',
            Username: username,
            TemporaryPassword: password,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                },
            ],
        }).promise()

        /*
        CREATE USER - RESPONSE:
        {
            "User": {
                "Username": "karlgolka3",
                "Attributes": [
                    {
                        "Name": "sub",
                        "Value": "a36fe378-fb89-4ed4-9f82-f598bca0e399"
                    },
                    {
                        "Name": "email",
                        "Value": "contact@karlgolka3.com"
                    }
                ],
                "UserCreateDate": "2021-05-20T18:41:42.075Z",
                "UserLastModifiedDate": "2021-05-20T18:41:42.075Z",
                "Enabled": true,
                "UserStatus": "FORCE_CHANGE_PASSWORD"
            }
        }
        */


        let token;
        const initAuthResponse = await cognito.adminInitiateAuth({
            AuthFlow: 'ADMIN_NO_SRP_AUTH',
            ClientId: CLIENT_ID,
            UserPoolId: POOL_ID,
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password
            }
        }).promise()

        /*
        FYI

        {
                "ChallengeName": "NEW_PASSWORD_REQUIRED",
                "Session": "AYABeFvOBUP...",
                "ChallengeParameters": {
                    "USER_ID_FOR_SRP": "karlgolka3",
                    "requiredAttributes": "[]",
                    "userAttributes": "{\"email\":\"contact@karlgolka3.com\"}"
                }
            }

        */

        if (initAuthResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
            const newPasswordResponse = await cognito.adminRespondToAuthChallenge({
                ChallengeName: 'NEW_PASSWORD_REQUIRED',
                ClientId: CLIENT_ID,
                UserPoolId: POOL_ID,
                ChallengeResponses: {
                    USERNAME: username,
                    NEW_PASSWORD: password,
                },
                Session: initAuthResponse.Session
            }).promise()
            token = newPasswordResponse.AuthenticationResult.AccessToken
            /*

            NEW PASSWORD RESPONSE:
            --------------------------
            {
                "ChallengeParameters": {},
                "AuthenticationResult": {
                    "AccessToken": "eyJraW...",
                    "ExpiresIn": 3600,
                    "TokenType": "Bearer",
                    "RefreshToken": "eyJjdH...",
                    "NewDeviceMetadata": {
                        "DeviceKey": "us-west-2_cd083315-8....",
                        "DeviceGroupKey": "-cgSNKCRd"
                    }
                }
            }
            */
            

        } 
        token = initAuthResponse.AuthenticationResult.AccessToken
        console.log(`🚀 ~ token`, token);
        return {
            token
        }

    } catch (err) {
        console.log('🔴🔴🔴 err 🔴🔴🔴 ')
        console.log(JSON.stringify(err, null, '  '))
        console.log(err, err.stack);
    }

}

