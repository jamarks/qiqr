/* eslint-disable import/no-anonymous-default-export */
import db from '../../../../utils/db';
import { getSession } from 'next-auth/client'


export default async (req, res) => {
  const session = await getSession({ req })
  const data = req.body
  
  console.log(data)

  if (session) {
    // update
    try {
        const doc = await db.collection('user').doc(id).get();
        if (!doc.exists) {
            
            db.collection("user").add({
                name: session.name,
                country: session.email
            });
        }
        res.status(200).json({message:'User Created'});
       
      } catch (e) {
        res.status(400).json({ error: e });
      }
  
  } else {
    res.status(400).json({ error: 'Session not found' });
  }


  
}