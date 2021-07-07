import { NextApiRequest, NextApiResponse } from 'next'

// ##################################################################################
// # INCOMING WEBHOOK (for terraform only, for now)
//   • two query param INPUTS: token (1 guid per env), env ('dev' | 'prod')
//   • 
// ##################################################################################

// ------------------------
const handler = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ text: 'Hello' })
}

export default handler