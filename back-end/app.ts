import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import authetication from "./routes/authenticationRoutes";
import queryRoutes from "./routes/apiQueryRoutes";
import movieRoutes from "./routes/movieRoutes";
import listRoutes from "./routes/listRoutes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
