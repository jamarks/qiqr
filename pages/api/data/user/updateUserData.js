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
        const id = req.body.id;
        
        if (req.method === 'POST') {
          // sacar email 
          delete data.id;
          delete data.email;
          delete data.created;
          delete data.name;

          //console.log(data)
          // diferenciar si es un insert o es un update
          const doc = await db.collection('user').doc(id).get();
          if (doc.exists) {
            await db.collection('user').doc(id).update({...data,  updated: new Date().toISOString(),});
            res.status(200).json({message:'User Updated'});
          }
        } 
      } catch (e) {
        res.status(400).json({ error: e });
      }
      
  
  } else {
    res.status(400).json({ error: 'Session not found' });
  }


  
}