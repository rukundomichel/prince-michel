import express from "express";
import cors from "cors";
import routes from "./routes/main.route.js";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.listen(port, ()=>{
  console.log(`App running on port: ${port}`);
})

