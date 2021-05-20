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
    
    // DO I NEED?
    // accessKeyId:...
    // secretAccessKey: ...
});



// thx: https://docs.aws.amazon.com/cognito/latest/developerguide/authentication.html
// thx: https://dzone.com/articles/authentication-and-authorization-to-amazon-cognito
// thx: https://stackoverflow.com/questions/48313291/using-aws-cognito-in-a-lambda-function-with-npm
exports.handler = async (event, context, callback) => {
    const usernameOrEmail = event.usernameOrEmail
    const password = event.password
    console.log("👍👍👍👍👍👍👍👍👍👍👍 ~ event", event) // event has PAYLOAD, and we put whatever we want in there
    console.log(`🚀 ~ password`, password);
    console.log(`🚀 ~ usernameOrEmail`, usernameOrEmail);



    //   await cognitoProvider.adminInitiateAuth(...)


    // Amazon Cognito creates a session which includes the id, access, and refresh tokens of an authenticated user.
    const authenticationData = {
        Username: usernameOrEmail,
        Password: password,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const poolData = {
        UserPoolId: POOL_ID,
        ClientId: CLIENT_ID
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
        Username: USERNAME,
        Pool: userPool
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            const accessToken = result.getAccessToken().getJwtToken();
            console.log(`🚀 ~ accessToken`, accessToken);
            return {
                token: accessToken
            };

            // does NOT apply?
            /* Use the idToken for Logins Map when Federating User Pools with identity pools
             or when passing through an Authorization Header to an API Gateway Authorizer */
            const idToken = result.idToken.jwtToken;
        },

        onFailure: function (err) {
            alert(err);
        },

    });

}

