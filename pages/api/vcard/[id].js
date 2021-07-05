var vCardsJS = require('vcards-js');
/* eslint-disable import/no-anonymous-default-export */
import db from '../../../utils/db';

export default async (req, res) => {
 const { id } = req.query;

 var vCard = vCardsJS();

 try {
  if (req.method === 'GET') {
   const doc = await db.collection('user').doc(id).get();
   if (!doc.exists) {
    res.status(404).end();
   } else {

    try {
     let names =  doc.data().name.split(" ");
     //set properties
     vCard.formattedName = doc.data().name
     vCard.firstName = names[0];
     //vCard.middleName = 'J';
     vCard.lastName = names[names.length-1];
     vCard.organization = doc.data().companyname
     vCard.photo.attachFromUrl(doc.data().photo, 'JPEG');
     vCard.workPhone = doc.data().phone
     //vCard.birthday = new Date(1985, 0, 1);
     vCard.title = doc.data().title;
     vCard.url = doc.data().linkedin
     vCard.note = doc.data().aboutme;
     //save to file
     const fileName = './public/vcards/'+doc.data().permalink+'.vcf'
     const fileNameDownload = '/vcards/'+doc.data().permalink+'.vcf'
     vCard.saveToFile(fileName);
     //vCard.attachFromUrl
     //console.log(fileName)
     //console.log(vCard.getFormattedString());
     res.redirect(307,fileNameDownload)
     //res.status(200).send(vCard.getFormattedString())
    }
    catch (e) {
     res.status(400).json(e.message);
    }
   }
  }
 }
 catch (e) {
  res.status(400).json(e.message);
 }
 //get as formatted string
 

}
