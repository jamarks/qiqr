// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'

const secret = process.env.SECRET

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const token = await jwt.getToken({ req, secret })
  res.send(JSON.stringify(token, null, 2))
}