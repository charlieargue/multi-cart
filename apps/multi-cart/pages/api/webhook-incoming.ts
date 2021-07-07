import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

// ##################################################################################
// # INCOMING WEBHOOK (for terraform only, for now)
//   • eg. http://localhost:4200/api/webhook-incoming?token=123&env=dev
//   • two query param INPUTS: token (1 guid per env), env ('dev' | 'prod')
//   • will authenticate token against env token saved in NextJS
//   • fire & forget CURL-equivalent (prolly via fetch, or axios)
//      - TODO: add sentry here instead of just throwing errors
// ##################################################################################
const NEXT_PUBLIC_WEBHOOK_TOKEN_DEV = process.env.NEXT_PUBLIC_WEBHOOK_TOKEN_DEV
const NEXT_PUBLIC_WEBHOOK_TOKEN_PROD = process.env.NEXT_PUBLIC_WEBHOOK_TOKEN_PROD
const NEXT_PUBLIC_GITHUB_PAT = process.env.NEXT_PUBLIC_GITHUB_PAT
const URL_OUTGOING = 'https://api.github.com/repos/charlieargue/multi-cart/dispatches'

// ------------------------
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token, env } = req.query
    console.log(`🚀 ~ env`, env)
    console.log(`🚀 ~ token`, token)
    if (!token || !env) {
        throw new Error('Missing query parameters for incoming webhook')
    }
    switch (env) {
        case 'dev':
            if (token !== NEXT_PUBLIC_WEBHOOK_TOKEN_DEV) {
                throw new Error('Invalid token for incoming webhook')
            }
            break

        // -------------------------------------
        // 🔥 PRODUCTION
        // -------------------------------------
        case 'prod':
            if (token !== NEXT_PUBLIC_WEBHOOK_TOKEN_PROD) {
                throw new Error('Invalid Token for incoming webhook')
            }
            break

        default:
            throw new Error('Invalid environment for incoming webhook')
            break
    }

    // NOTE: this is the github actions webhook (one for DEV, one for PROD TODO:🔥 )
    const options = {
        headers: { 'authorization': `Bearer ${NEXT_PUBLIC_GITHUB_PAT}` }
    };
    try {
        const result = await axios.post(URL_OUTGOING, { 'event_type': 'tf-test-dev-and-promote-to-prod' }, options)
        return result
    } catch (error) {
        console.log(error)
        throw new Error('Invalid request made by webhook')
    }



}

export default handler