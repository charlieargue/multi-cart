"use strict"
const {
    POOL_ID,
    CLIENT_ID
} = process.env;
const {
    AWS_REGION_VAR
} = process.env;
const CognitoIdentityServiceProvider = require('aws-sdk/clients/cognitoidentityserviceprovider') // Much smaller size
const AmazonCognitoIdentity = new CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18',
    region: AWS_REGION_VAR
});

// thx: https://stackoverflow.com/questions/48313291/using-aws-cognito-in-a-lambda-function-with-npm
// thx: https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-authentication-flow.html#amazon-cognito-user-pools-server-side-authentication-flow
// big-thx: https://dev.to/franzwong/howto-implement-user-sign-up-and-login-with-aws-cognito-boa
exports.handler = async (event, context, callback) => {
    const usernameOrEmail = event.usernameOrEmail
    const password = event.password
    console.log("👍👍👍👍👍👍👍👍👍👍👍 ~ event", event) // event has PAYLOAD, and we put whatever we want in there
    console.log(`🚀 ~ password`, password);
    console.log(`🚀 ~ usernameOrEmail`, usernameOrEmail);

    try {

        const data = await AmazonCognitoIdentity.adminInitiateAuth({
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
        /* 
        RESPONSE SYNTAX:
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
       return {
           token: data.AuthenticationResult.AccessToken
       }
    } catch (err) {
        console.log(err, err.stack);
    }


    /*

For server-side apps, user pool authentication is similar to that for client-side apps, except for the following:

1) The server-side app calls the 🔥 AdminInitiateAuth API operation (instead of InitiateAuth). 
- This operation requires AWS admin credentials. This operation returns the authentication parameters.

2) Once it has the authentication parameters, the app calls the 🔥  AdminRespondToAuthChallenge API operation (instead of RespondToAuthChallenge), 
- which also requires AWS admin credentials.

3) The AdminInitiateAuth and AdminRespondToAuthChallenge operations can't accept user-name-and-password user credentials for admin sign-in, 
- 🔥 unless you explicitly enable them to do so by doing one of the following:

    a) Pass 🔥 ADMIN_USER_PASSWORD_AUTH (formerly known as ADMIN_NO_SRP_AUTH) for the ExplicitAuthFlow parameter in your server-side app's call to CreateUserPoolClient or UpdateUserPoolClient.
    b) Choose Enable sign-in API for server-based authentication (🔥 ADMIN_USER_PASSWORD_AUTH) in the App clients tab in Create a user pool. 
    - For more information, see Configuring a User Pool App Client.

    */

    //   await cognitoProvider.adminInitiateAuth(...)


    // Amazon Cognito creates a session which includes the id, access, and refresh tokens of an authenticated user.
    // const authenticationData = {
    //     Username: usernameOrEmail,
    //     Password: password,
    // };
    // const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    // const poolData = {
    //     UserPoolId: POOL_ID,
    //     ClientId: CLIENT_ID
    // };
    // const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    // const userData = {
    //     Username: USERNAME,
    //     Pool: userPool
    // };
    // const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    // cognitoUser.authenticateUser(authenticationDetails, {
    //     onSuccess: function (result) {
    //         const accessToken = result.getAccessToken().getJwtToken();
    //         console.log(`🚀 ~ accessToken`, accessToken);
    //         return {
    //             token: accessToken
    //         };

    //         // does NOT apply?
    //         /* Use the idToken for Logins Map when Federating User Pools with identity pools
    //          or when passing through an Authorization Header to an API Gateway Authorizer */
    //         const idToken = result.idToken.jwtToken;
    //     },

    //     onFailure: function (err) {
    //         alert(err);
    //     },

    // });

}

