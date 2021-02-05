import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
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

  const {
    query: { params },
  } = req

  // Allow only GET method
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({
      status: 405,
      message: `Method ${req.method} Not Allowed`
    })
  }

  // Allow only one "first_name" parameter
  if (params.length != 1) {
    res.status(422).json({
      status: 422,
      message: "Invalid data: Too many parameters"
    })
  }

  // Validate "first_name" string
  const first_name = params[0]
  const { error, value } = Joi.string()
    .alphanum()
    .min(2)
    .max(30)
    .required()
    .validate(first_name)

  if (error) {
    res.status(422).json({
      status: 422,
      message: "Invalid data: " + error
    })
  }

  // API logic
  res.json({ payload: `Hello ${first_name}!` })
}