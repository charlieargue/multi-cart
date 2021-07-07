import axios, { AxiosResponse } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

// ##################################################################################
// # INCOMING WEBHOOK (for terraform only, for now)
//   • eg. http://localhost:4200/api/webhook-incoming?token=123&env=dev
//   • two query param INPUTS: token (1 guid per env), env ('dev' | 'prod')
//   • will authenticate token against env token saved in NextJS
//   • fire & forget CURL-equivalent (prolly via fetch, or axios)
//      - TODO: add sentry here instead of just throwing errors

//   • 🔴  CAUTION 🔴 DEV URL:  
//   •     https://dev.multicart.app/api/webhook-incoming?token=15196545-0fed-46ed-9973-1230e5d4e591&env=dev
// ##################################################################################
const NEXT_PUBLIC_WEBHOOK_TOKEN_DEV = process.env.NEXT_PUBLIC_WEBHOOK_TOKEN_DEV
const NEXT_PUBLIC_GITHUB_PAT = process.env.NEXT_PUBLIC_GITHUB_PAT
const URL_OUTGOING = 'https://api.github.com/repos/charlieargue/multi-cart/dispatches'

// ------------------------
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token, env } = req.query
    if (!token || !env) {
        throw new Error('Missing query parameters for incoming webhook')
    }
    switch (env) {
        case 'dev':
            if (token !== NEXT_PUBLIC_WEBHOOK_TOKEN_DEV) {
                throw new Error('Invalid token for incoming webhook')
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
        const result: AxiosResponse<unknown> = await axios.post(URL_OUTGOING, { 'event_type': 'tf-test-dev-and-promote-to-prod' }, options)
        if (result.status === 204) {
            res.status(200).json({ status: '✅  Success' })
        } else {
            console.log('Did not get 204 from OUTGOING URL')
            throw new Error('Did not get 204 from OUTGOING URL')
        }
    } catch (error) {
        console.log(error)
        if (error.message) {
            throw new Error(error.message)
        } else {
            throw new Error('Invalid request made by webhook')
        }
    }



}

export default handler