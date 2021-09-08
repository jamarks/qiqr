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
          console.log(doc.data())

          const filename = encodeURIComponent(id + '.vcf')

          let names = doc.data().profileName.split(" ");
          
          vCard.formattedName = doc.data().profileName
          vCard.firstName = names[0];
          
          if((names.length - 2) > 0 )
            vCard.middleName = names[1];

          vCard.lastName = names[names.length - 1];
          vCard.organization = doc.data().profileCompanyName
          // ***************** IMAGE *****************
          
          if (doc.data().profilePhoto) {
            const imageFileType = 'image/jpeg'
            vCard.photo.attachFromUrl(doc.data().profilePhoto, imageFileType);
            vCard.logo.attachFromUrl(doc.data().profilePhoto, imageFileType);
            //vCard.photo.embedFromFile(doc.data().photo)

            imageToBase64(doc.data().profilePhoto) // Image URL
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

          vCard.workPhone = doc.data().profilePhone
          //vCard.birthday = new Date(1985, 0, 1);
          vCard.title = doc.data().profileTitle + '-' + doc.data().profileSubTitle;
          vCard.url = doc.data().profileLinkedin
          vCard.note = doc.data().profileAboutMe;
          vCard.role = doc.data().profileTitle;
          vCard.workUrl = doc.data().profileWebsite;
          
          // WorkAddress
          vCard.workAddress.label = 'Work Address';
          vCard.workAddress.street = doc.data().profileStreet;
          vCard.workAddress.postalCode = doc.data().profileZip;
          vCard.workAddress.city = doc.data().profileCity;
          vCard.workAddress.countryRegion = doc.data().profileCountry;

          //vCard.socialUrls['linkedIn'] = doc.data().profileLinkedin;
          vCard.version = '3.0';

          const response = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL}/api/upload-url?file=${filename}`);

          const { url, fields } = await response.json();
          
          
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
