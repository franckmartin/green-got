import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run cors
  await cors(req, res)

  // Allow only GET method
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({
      status: 405,
      message: `Method ${req.method} Not Allowed`
    })
  }

  // first_name parameter is mandatory
  return res.status(422).json({
    status: 422,
    message: "Invalid data: You shall give a first_name parameter"
  })
}