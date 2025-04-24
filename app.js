import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

//jj
const port = process.env.PORT;
const mongodb = process.env.MONGO_URL;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/users', userRoutes);

app.use('/blogs', blogRouter);


mongoose.connect(mongodb)
  .then(() => {
    console.log('App connected to mongo url');
    app.listen(port, () => {
      console.log(`App running on port: ${port}`);
    })
  })
  .catch((err) => {
    console.log(err)
  })


