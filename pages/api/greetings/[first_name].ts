import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
import { NextApiRequest, NextApiResponse } from 'next'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'OPTIONS'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run cors
  await cors(req, res)

  const {
    query: { first_name },
  } = req

  // Allow only GET method
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({
      status: 405,
      message: `Method ${req.method} Not Allowed`
    })
  }

  // Rest of the API logic
  res.json({ payload: `Hello ${first_name}!` })
}