import { getSession } from 'next-auth/client'
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const session = await getSession({ req })
  res.send(JSON.stringify(session, null, 2))
}