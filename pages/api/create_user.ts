import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ['POST', 'OPTIONS'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run cors
  await cors(req, res)

  // Allow only POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({
      status: 405,
      message: `Method ${req.method} not allowed`
    })
  }

  // Validate request body against JSON schema
  const { error, value } = Joi.object({
    firstName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required(),
  
    lastName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required()
  }).validate(req.body)

  if (error) {
    return res.status(422).json({
      status: 422,
      message: "Invalid data: " + error
    })
  }

  // API logic
  return res.json({ 
    payload: {
      firstName: req.body.firstName.toUpperCase(),
      lastName: req.body.lastName.toUpperCase()
    }
  })
}
