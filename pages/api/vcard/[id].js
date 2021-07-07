import aws from 'aws-sdk';

import {PutObjectCommand } from "@aws-sdk/client-s3";
// /import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fetch from "node-fetch";

var vCardsJS = require('vcards-js');
/* eslint-disable import/no-anonymous-default-export */

//https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd
//https://github.com/leerob/nextjs-aws-s3/blob/main/pages/index.js
import db from '../../../utils/db';

export default async (req, res) => {
 const { id } = req.query;

 var vCard = vCardsJS();
 

 aws.config.update({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
  region: process.env.S3_UPLOAD_REGION,
  signatureVersion: 'v4',
});


// create S3 instance
const s3 = new aws.S3();

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
     
     const bucketParams = {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: `vcard-${doc.data().permalink}.vcf`,
      Body: vCard.getFormattedString(),
      Expires: 60*60
    };

    //console.log(bucketParams)
    const run = async () => {
      
      try {
        // Create the command.
        const command = new PutObjectCommand(bucketParams);
        //console.log(command)
    
        // Create the presigned URL.
        
        //const signedUrl = await s3.getSignedUrl(s3, command, {
        //  expiresIn: 3600,
        //});
        
     

        const signedUrl = s3.getSignedUrl('putObject', bucketParams);

           //console.log(
          //`\nPutting "${bucketParams.Key}" in ${bucketParams.Bucket} using signedUrl with body "${bucketParams.Body}" in v3`
        //);

        console.log(signedUrl);

        const response = await fetch(signedUrl);
        console.log(response)
        /*
        //console.log(signedUrl);
        //const response = await fetch(signedUrl);
        //console.log(
        //  `\nResponse returned by signed URL:`
        //);
        //return response;
        */
      } catch (err) {
        console.log("Error creating presigned URL", err);
      }
      
      
      res.status(200).send({'message':'ok'});

    };
    run();

      
     //console.log(vCard.getFormattedString());

     //save to file
     //const fileNameDownload = './public/vcards/'+doc.data().permalink+'.vcf'
     //const fileNameDownload = '/vcards/'+doc.data().permalink+'.vcf'
     
     //vCard.saveToFile(fileNameDownload);

     /*const uploadFile = (buffer, name, type) => {
      const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.S3_BUCKET,
        ContentType: type.mime,
        Key: fileNameDownload,
      };
      return s3.upload(params).promise();
    };

    const path = './public/vcards/';
    const buffer = fs.readFileSync(path);
    //const type = await FileType.fromBuffer(buffer);
    //const fileName = `bucketFolder/${Date.now().toString()}`;
    const data = await uploadFile(buffer, fileNameDownload, vcf);
    return response.status(200).send(data);
  
     //vCard.attachFromUrl
     //console.log(fileName)
     //console.log(vCard.getFormattedString());
     res.redirect(307,fileNameDownload)
     //res.status(200).send(vCard.getFormattedString())
     */
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
