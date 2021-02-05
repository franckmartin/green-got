import { NextApiRequest, NextApiResponse } from 'next'
import Joi from 'joi'
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

const schema = Joi.object({
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
})

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['POST', 'OPTIONS'],
  })
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run cors
  await cors(req, res)

  // Allow only POST method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({
      status: 405,
      message: `Method ${req.method} Not Allowed`
    })
  }

  if (!req.body) {
    res.status(422).json({
      status: 422,
      message: "Invalid data"
    })
  }

  // const { error, value } = schema.validate(req.body)
  if (schema.validate(req.body).error) {
    res.status(422).json({
      status: 422,
      message: "Invalid data" + schema.validate(req.body).error
    })
  }

  // Rest of the API logic
  res.json({ 
    payload: {
      firstName: req.body.firstName.toUpperCase(),
      lastName: req.body.lastName.toUpperCase()
    }
  })
}
