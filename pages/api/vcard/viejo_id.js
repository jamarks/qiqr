import aws from 'aws-sdk';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

//import fetch from "node-fetch";

var vCardsJS = require('vcards-js');
var FormData = require('form-data');
var fs = require('fs');

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
          let names = doc.data().name.split(" ");
          //set properties
          vCard.formattedName = doc.data().name
          vCard.firstName = names[0];
          //vCard.middleName = 'J';
          vCard.lastName = names[names.length - 1];
          vCard.organization = doc.data().companyname
          vCard.photo.attachFromUrl(doc.data().photo, 'JPEG');
          vCard.workPhone = doc.data().phone
          //vCard.birthday = new Date(1985, 0, 1);
          vCard.title = doc.data().title;
          vCard.url = doc.data().linkedin
          vCard.note = doc.data().aboutme;

          const fileNameDownload = './public/vcards/'+doc.data().permalink+'.vcf'
          const fileName = doc.data().permalink+'.vcf'
          //const fileNameDownload = '/vcards/'+doc.data().permalink+'.vcf'

          vCard.saveToFile(fileNameDownload);

          

          

          const upload = async (res) => {
            try {
              const { url, fields } = await s3.createPresignedPost({
                Bucket: process.env.S3_UPLOAD_BUCKET,
                Fields: {
                  key: `vcard-${doc.data().permalink}.vcf`,
                  ACL: 'public-read'
                },
                Body: vCard.getFormattedString(),
                Expires: 60, // seconds
                Conditions: [
                  ['content-length-range', 0, 1048576], // up to 1 MB
                ],
              });
              //console.log(post)
              console.log(url)
              console.log(fields)

              //const { url, fields } = await res.json();
              //const formData = new FormData();

              //Object.entries({ ...fields, file }).forEach(([key, value]) => {
              //  formData.append(key, value);
              //});

              const uploadRes = await fetch(url, {
                method: 'POST',
                body: vCard.getFormattedString(),
              });
              
              console.log(uploadRes)

              res.status(200).send({ 'message': 'ok' });
            }
            catch (err) {
              console.log("Error createPresignedPost", err);
            }
          }

          //console.log(bucketParams)
          const run = async (res) => {
            try {

              const bucketParams = {
                Bucket: process.env.S3_UPLOAD_BUCKET,
                Key: doc.data().permalink+'.vcf',
                Body: encodeURIComponent(vCard.getFormattedString()),
                Expires: 3600
              };


              const { url, fields } = await s3.createPresignedPost({
                Bucket: process.env.S3_UPLOAD_BUCKET,
                Fields: {
                  key: fileName,
                  ACL:'public-read'
                },
                Expires: 60, // seconds
                Conditions: [
                  ['content-length-range', 0, 1048576], // up to 1 MB
                ],
              });

              const formData = new FormData();
              //console.log(formData)
              Object.entries({ ...fields, fileNameDownload }).forEach(([key, value]) => {
                formData.append(key, value);
              });

              //console.log(formData)

              const upload = await fetch(url, {
                method: 'POST',
                body: formData,
              });

              console.log(upload)
              /*

              
              const command = new PutObjectCommand(bucketParams);              
              const signedUrl = s3.getSignedUrl('putObject', bucketParams)
              console.log(signedUrl)
              const response = await fetch(signedUrl);
              console.log(response)
              */

              //const signedUrl = await s3.getSignedUrl(s3, command, {
              //  expiresIn: 3600,
              //});
              //console.log(results)
              
              /*
              /*
              const command = new GetObjectCommand(bucketParams);
              const url = await getSignedUrl(client, command, { expiresIn: 3600 });
              //const response = await fetch(signedUrl);
              console.log(url)
              
              

              const command = new PutObjectCommand(bucketParams);
              const results = await s3Client.send(command);
              const signedUrl = s3Client.getSignedUrl('putObject', bucketParams);
              */

              //const signedUrl = s3Client.getSignedUrl('putObject', bucketParams);

              //console.log(
              //`\nPutting "${bucketParams.Key}" in ${bucketParams.Bucket} using signedUrl with body "${bucketParams.Body}" in v3`
              //);
              /*
              const results = s3.getSignedUrl('putObject', bucketParams, function(err, url)
              {
                 if (err) { throw {msg:err, code:"AWS_ERROR"}; }
                 else { return url; }
              });  
              
              console.log(results);
                */
              //const response = await fetch(signedUrl);
              //console.log(response)
              
              //console.log(signedUrl);
              //const response = await fetch(signedUrl);
              //console.log(
              //  `\nResponse returned by signed URL:`
              //);
              //return response;
              res.status(200).send({ 'message': 'ok' });  
            } catch (err) {
              console.log("Error creating presigned URL", err);
              res.status(400).send({ 'message': err });
            }
            
          };

          run(res);
          //upload(res);

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
