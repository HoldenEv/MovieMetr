import { BlobServiceClient } from "@azure/storage-blob";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING as string,
);
const containerClient = blobServiceClient.getContainerClient("profilepictures");

export const uploadImage = async (req: Request, res: Response) => {
  // Extract the file from the request object
  const file = req.file as Express.Multer.File;
  // Generate a unique name for the blob using UUID v4
  const blobName = uuidv4() + "-" + file.originalname;
  // Get a reference to the block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadOptions = {
    blobHTTPHeaders: {
      blobContentType: "image/jpeg",
      blobContentDisposition: "inline", // This sets the Content-Disposition header to inline
    },
  };
  try {
    // Upload the file buffer to Azure Blob Storage
    await blockBlobClient.uploadData(file.buffer, uploadOptions);
    // Get the URL of the uploaded blob
    const imageUrl = blockBlobClient.url;
    // Send the URL back to the client
    res.status(200).send({ imageUrl });
  } catch (error) {
    // Handle any errors during the upload process
    console.error("Error uploading image", error);
    res.status(500).send("Error uploading image");
  }
};
