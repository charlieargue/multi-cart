import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const NEXT_PUBLIC_WEBHOOK_TOKEN_DEV = process.env.NEXT_PUBLIC_WEBHOOK_TOKEN_DEV;
const NEXT_PUBLIC_GITHUB_PAT = process.env.NEXT_PUBLIC_GITHUB_PAT;
const URL_OUTGOING =
    'https://api.github.com/repos/charlieargue/multi-cart/dispatches';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token, env } = req.query;
    if (!token || !env) {
        throw new Error('Missing query parameters for incoming webhook');
    }
    switch (env) {
        case 'dev':
            if (token !== NEXT_PUBLIC_WEBHOOK_TOKEN_DEV) {
                throw new Error('Invalid token for incoming webhook');
            }
            break;

        default:
            throw new Error('Invalid environment for incoming webhook');
            break;
    }

    const options = {
        headers: { authorization: `Bearer ${NEXT_PUBLIC_GITHUB_PAT}` },
    };
    try {
        const result: AxiosResponse<unknown> = await axios.post(
            URL_OUTGOING,
            { event_type: 'tf-test-dev-and-promote-to-prod' },
            options
        );
        if (result.status === 204) {
            res.status(200).json({ status: '✅  Success' });
        } else {
            console.log('Did not get 204 from OUTGOING URL');
            throw new Error('Did not get 204 from OUTGOING URL');
        }
    } catch (error) {
        console.log(error);
        if (error.message) {
            throw new Error(error.message);
        } else {
            throw new Error('Invalid request made by webhook');
        }
    }
};

export default handler;
