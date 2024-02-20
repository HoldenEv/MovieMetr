import express from "express";
//needed to install cors and 
//npm install --save-dev @types/cors to get rid of the error
import cors from "cors";
import routes from "./routes/index";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
