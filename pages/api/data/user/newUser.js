/* eslint-disable import/no-anonymous-default-export */
import db from '../../../../utils/db';
import { getSession } from 'next-auth/client'


export default async (req, res) => {
  const session = await getSession({ req })
  console.log('------ NEW USER SESSION-------')
  console.log(session)
  console.log('------ !NEW USER SESSION-------')
  const data = req.body
  console.log('------ NEW USER -------')
  console.log(data)
  console.log('------ !NEW USER -------')

  //console.log('email:' + data.email)
  //console.log('name:' + data.name)

  if (data) {
    // update
    try {
        const doc = await db.collection('user').where('email', '==', data.email).get();  
        
        if (doc.empty) {
            // Insert User
            const name = data.name? data.name : ''
            const email = data.email
            const profileName = name
            const profileEmail = email
            const profilePhoto = data.photo ? data.photo : ''
            const userId = data.userId ? data.userId : ''
            
            // aca, si no tiene email, hay que hacer algo, probablemente devolver false y que tenga q loguearse con otro metodo.
            db.collection("user").add({name: name,email: email, profileName: profileName, profileEmail: profileEmail, internalId : userId, profilePhoto: profilePhoto,  created: new Date().toISOString()});
            res.status(200).json({message:'User Created'});
        }
        else
          res.status(200).json({message:'User Exists'});
      } catch (e) {
        res.status(400).json({ error: e.message });
      }
  
  } else {
    res.status(400).json({ error: 'Data not found' });
  }


  
}