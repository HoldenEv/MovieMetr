import dotenv from "dotenv";
dotenv.config();
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../database/db";
import { S3Client, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";
import awsObjectUrl from "../../database/awsObjectUrlSchema";

const region = process.env.NEXT_PUBLIC_AWS_S3_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY_ID;


if (!region || !accessKeyId || !secretAccessKey) {
  console.log("AWS Credentials are undefined");
  throw new Error("Missing AWS S3 configuration. Check your environment variables.");
}

const s3ClientConfig: S3ClientConfig = {
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
};

const s3Client: S3Client = new S3Client(s3ClientConfig);

async function uploadFileToS3(file : any, fileName: String) {
  const fileBuffer = file; 
  console.log(fileName);

  // NOTE: We can change the content type to whatever we need
  // Also I am not sure if we want unique images but right now we do
  // with how I set this up
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: `myFolder/${fileName}`,
    Body: fileBuffer,
    ContentType : "image/png"
  }
  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileName;
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json( { error: "File is required."}, { status : 400 } );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);
    console.log("riht heer ")
    const s3ObjectURL = "https://temp-bucket-h4i.s3.us-east-2.amazonaws.com/myFolder/" + fileName;
    await awsObjectUrl.create({ objectUrl: s3ObjectURL });

    return NextResponse.json({ success : true, s3ObjectURL});

  } catch (error : any) {
    return NextResponse.json({error});
  }
}