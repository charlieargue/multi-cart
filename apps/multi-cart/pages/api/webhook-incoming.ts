// thx: https://dmitripavlutin.com/timeout-fetch-request/
import { NextApiRequest, NextApiResponse } from 'next'

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
const URL_OUTGOING = 'https://api.github.com/repos/charlieargue/multi-cart/dispatches'

// ------------------------
async function fetchWithTimeout(resource, options) {
    const { timeout = 8000 } = options // 8 second default

    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    })
    clearTimeout(id)

    return response
}

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
    // try {
    //     const res = await fetch(URL_OUTGOING)
    //     return await res.json()
    // } catch (error) {
    //     console.log(error)
    // }
    try {
        const response = await fetchWithTimeout(URL_OUTGOING, {
            timeout: 1000
        })
        const result = await response.json()
        return result
    } catch (error) {
        console.log(`🚀 ~ error`, error);
        // Timeouts if the request takes too long
        console.log(error.name === 'AbortError')
        throw new Error('Invalid request, took too long')
    }
}

export default handler