"use server";
import dotenv from "dotenv";
dotenv.config();

import { S3 } from "aws-sdk";

export default async function uploadOnBucket(blob: any) {
  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY, // Store in env variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Store in env variables
    region: process.env.AWS_REGION, // AWS region
  });

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME, // S3 bucket name
    Key: "photoBJ",
    ContentType: "png",
    // Body: formData.file,
    Body: blob,
    ACL: "public-read", // Optional: Make file publicly readable
  };

  try {
    const signedUrl = await s3.upload(s3Params, (err, data) => {
      // console.log(err);
      // console.log(data);
    });
    console.log(signedUrl);
  } catch (error) {
    console.log(error);
  }
}
