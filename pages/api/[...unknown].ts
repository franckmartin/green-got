import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import { NextApiRequest, NextApiResponse } from 'next'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run cors
  await cors(req, res)

  res.status(404).json({
    status: 404,
    //message: `URL /${unknown.join('/')} not found`
    message: `Resource ${req.query.unknown} not found`
  })
}
