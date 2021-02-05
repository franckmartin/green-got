import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import { NextApiRequest, NextApiResponse } from 'next'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run cors
  await cors(req, res)

  res.status(404).json({
    status: 404,
    message: `Resource not found`
  })
}