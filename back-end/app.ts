import express from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import authetication from "./routes/authenticationRoutes";
import queryRoutes from "./routes/apiQueryRoutes";
import movieRoutes from "./routes/movieRoutes";
import listRoutes from "./routes/listRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import personRoutes from "./routes/personRoutes";
import TVshowRoutes from "./routes/TVshowRoutes";
dotenv.config();

//start express
const app = express();
const port = process.env.PORT || 3001;

//database connection
import mongoose from "mongoose";
const uri = process.env.URI;
mongoose.connect(uri || "");

//Azure Blob Storage connection
const accountName = process.env.ACCOUNT_NAME;
const sasToken = process.env.SAS_TOKEN;
const containerName = process.env.CONTAINER_NAME;

//const blobServiceClient = new BlobServiceClient('https://' + accountName + '.blob.core.windows.net/' + sasToken);
//const containerClient = blobServiceClient.getContainerClass(containerName);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});
app.use("/authentication", authetication);
app.use("/apiQueryRoutes", queryRoutes);
app.use("/movieRoutes", movieRoutes);
app.use("/listRoutes", listRoutes);
app.use("/reviews", reviewRoutes);
app.use("/person", personRoutes);
app.use("/TVshow", TVshowRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
