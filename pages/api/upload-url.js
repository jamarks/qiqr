import aws from 'aws-sdk';

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
    region: process.env.S3_UPLOAD_REGION,
    signatureVersion: 'v4',
  });

  
  //console.log(req.query.file)

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Fields: {
      key: req.query.file,
      ACL:'public-read'
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 2097152], // up to 2 MB
    ],
  });

  res.status(200).json(post);
}