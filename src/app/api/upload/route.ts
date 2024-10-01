import { S3 } from "aws-sdk";
import crypto from "crypto";

const s3 = new S3({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: process.env.MY_AWS_REGION,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  const uploadPromises = files.map(async (file) => {
    const arrayBuffer = await file?.arrayBuffer();
    const buffer = await Buffer.from(arrayBuffer);

    const params = {
      Bucket: process.env.MY_AWS_BUCKET_NAME as string,
      Key: crypto.randomBytes(20).toString("hex"),
      ContentType: "image/png",
      Body: buffer,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, {}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  });

  const links = await Promise.all(uploadPromises);

  return Response.json({ links });
}
