var QRCode = require('qrcode')

/* eslint-disable import/no-anonymous-default-export */
import db from '../../../utils/db';

export default async (req, res) => {
 const { id } = req.query;

 try {
  if (req.method === 'GET') {
   const doc = await db.collection('user').doc(id).get();
   if (!doc.exists) {
    res.status(404).end();
   } else {
    //console.log(process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + doc.data().permalink)
    QRCode.toDataURL(process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + doc.data().permalink)
     .then(url => {
      res.status(200).json(url)
     })
     .catch(err => {
      console.error(err)
     })
   }
  }
 } catch (e) {
  res.status(400).end();
 }
}