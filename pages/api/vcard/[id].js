import db from '../../../utils/db';
var vCardsJS = require('vcards-js');
var FormData = require('form-data');
const imageToBase64 = require('image-to-base64');
var fs = require('fs');

/* eslint-disable import/no-anonymous-default-export */

//https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
//https://github.com/leerob/nextjs-aws-s3/blob/main/pages/index.js

export default async (req, res) => {
  const { id } = req.query;

  var vCard = vCardsJS();

  try {
    if (req.method === 'GET') {
      const doc = await db.collection('user').doc(id).get();
      if (!doc.exists) {
        res.status(404).json({ error: 'User not found' });

      } else {

        try {

          const filename = encodeURIComponent(id + '.vcf')

          let names = doc.data().name.split(" ");
          //set properties
          vCard.formattedName = doc.data().name
          vCard.firstName = names[0];
          //vCard.middleName = 'J';
          vCard.lastName = names[names.length - 1];
          vCard.organization = doc.data().companyname
          // ***************** IMAGE *****************
          if (doc.data().photo) {
            const imageFileType = 'image/jpeg'
            vCard.photo.attachFromUrl(doc.data().photo, imageFileType);
            vCard.logo.attachFromUrl(doc.data().photo, imageFileType);
            //vCard.photo.embedFromFile(doc.data().photo)

            imageToBase64(doc.data().photo) // Image URL
              .then(
                (response) => {
                  //console.log(response)
                  //vCard.photo.embedFromString(response, 'image/jpeg') 
                })
              .catch(
                (error) => { })
          }

          // ***************** !IMAGE *****************
          vCard.source = process.env.NEXT_PUBLIC_S3_URL + '/' + filename;

          vCard.workPhone = doc.data().phone
          //vCard.birthday = new Date(1985, 0, 1);
          vCard.title = doc.data().title;
          vCard.url = doc.data().linkedin
          vCard.note = doc.data().aboutme;


          vCard.workAddress.street = doc.data().workstreet;
          vCard.workAddress.postalCode = doc.data().workpostalcode;
          vCard.workAddress.city = doc.data().workcity;
          vCard.workAddress.countryRegion = doc.data().workcountry;



          //const fileNameDownload = './public/vcards/' + doc.data().permalink + '.vcf'
          //const fileName = doc.data().permalink + '.vcf'

          //vCard.saveToFile(fileNameDownload);




          //console.log(filename)  
          const response = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL}/api/upload-url?file=${filename}`);
          //console.log(res)
          const { url, fields } = await response.json();
          //console.log(url)
          //console.log(fields)

          const svgBuffer = Buffer.from(vCard.getFormattedString(), 'utf8');
          const formData = new FormData();

          Object.entries({ ...fields }).forEach(([key, value]) => {
            formData.append(key, value);
          });


          formData.append('file', svgBuffer, filename);
          const upload = await fetch(url, { method: 'POST', body: formData });
          //console.log(upload)

          if (upload.ok) {

            //console.log(process.env.NEXT_PUBLIC_S3_URL + '/' + filename)
            //console.log('Uploaded successfully!');
            res.status(200).json({ imageUrl: process.env.NEXT_PUBLIC_S3_URL + '/' + filename });
          }
          else
            res.status(404).json({ error: 'Error uploading file' });
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
