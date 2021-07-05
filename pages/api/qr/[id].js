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
    QRCode.toDataURL(process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + doc.data().permalink)
     .then(url => {
      res.status(200).json({data:url})
      //res.status(200).send({'content-type:',}})
     })
     .catch(err => {
      res.status(400).json(err.message);
     })
   }
  }
 } catch (err) {
  res.status(400).json(err.message);
 }
}