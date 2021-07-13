
/* eslint-disable import/no-anonymous-default-export */
import db from '../../../../utils/db';
import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  
  if (session) {
    try {
      if (req.method === 'GET') {
        const userRef = db.collection('user');
        // busco el supuesto unico perfil que tengo en la collection user con ese email. 
        const search = await userRef.where('email', '==', session.user.email).get();  
        if (search.empty) {
          res.status(400).json({ error: 'User not found' });
        } else {
          const user = search.docs[0].data()
          res.status(200).json({ data: user })
        }
      }
    } catch (err) {
      res.status(400).json({ error: err.message });  
    }
  }
  else {
    res.status(400).json({ error: 'Session not found' });
  }
}