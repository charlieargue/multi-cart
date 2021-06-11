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
    Operations which are now restricted in the Cognito service when you call the Global SignOut method:
    --------------------------------------------------------------------------------------------------
    • The user's refresh token cannot be used to get new tokens for the user.
    • The user's access token cannot be used against the user pools service.
    • The user must reauthenticate to get new tokens.
    */
    
    const token = event.token;
    console.log(`🚀 ~ token`, token);

    // TODO: there's room for improvement I'm sure, here,i.e. other tokens? actually prevent from using tokens after globalSignOut() --
    // it doesn't fully do what expected to do, afaik... TBD

    try {

        const data = await cognito.globalSignOut({
            AccessToken: token
        }).promise();
        
       return true

    } catch (err) {
        console.log(err, err.stack);
    }   
}