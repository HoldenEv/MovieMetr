import dotenv from "dotenv";
dotenv.config();
import { NextRequest, NextResponse } from "next/server";
import { S3Client, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";
const region = process.env.NEXTPUBLICAWSS3REGION;
const accessKeyId = process.env.NEXTPUBLICAWSS3ACCESSKEYID;
const secretAccessKey = process.env.NEXTPUBLICAWSS3SECRETACCESSKEYID;

// tells us if env aws stuff works
if (!region || !accessKeyId || !secretAccessKey) {
  console.log("AWS Credentials are undefined");
  throw new Error(
    "Missing AWS S3 configuration. Check your environment variables.",
  );
}

const s3ClientConfig: S3ClientConfig = {
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
};

const s3Client: S3Client = new S3Client(s3ClientConfig);

async function uploadFileToS3(file: any, fileName: String) {
  const fileBuffer = file;
  console.log(fileName);

  // NOTE: We can change the content type to whatever we need
  // Also I am not sure if we want unique images but right now we do
  // with how I set this up
  const params = {
    Bucket: process.env.NEXTPUBLICAWSS3BUCKETNAME,
    Key: `myFolder/${fileName}`,
    Body: fileBuffer,
    ContentType: "image/png",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);
    const s3ObjectURL =
      "https://movie-meter-profile-images.s3.us-east-2.amazonaws.com/myFolder/" +
      fileName;

    return NextResponse.json({ success: true, s3ObjectURL });
  } catch (error: any) {
    return NextResponse.json({ error });
  }
}
