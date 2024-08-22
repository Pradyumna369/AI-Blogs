import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import blogsRoute from './routes/blogroutes.js';
import {API_KEY, mongoDBURL} from './config.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/',blogsRoute)

mongoose
  .connect(mongoDBURL)
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.log(error)
    });

