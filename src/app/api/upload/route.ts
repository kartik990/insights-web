import { S3 } from "aws-sdk";
import crypto from "crypto";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  const arrayBuffer = await file?.arrayBuffer();
  const buffer = await Buffer.from(arrayBuffer);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: crypto.randomBytes(20).toString("hex"),
    ContentType: "image/png",
    Body: buffer,
  };

  const res = await new Promise((resolve, reject) => {
    s3.upload(params, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  return Response.json({ res });
}
