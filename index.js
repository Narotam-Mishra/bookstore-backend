import evar from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const server = express();
evar.config();

// middleware for parsing request body
server.use(express.json());

// middleware for handling CORS policy

// Option 1 :- Allow all origins with Default of cors(*)
server.use(cors());

// Option 2 :- Allow custom origins
// server.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }))

server.get("/", (req, res) => {
  console.log(req);
  res.send("Book store app using MERN stack");
});

server.use('/bookAPI', booksRoute);

// Run the server
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

// Connect to DB
mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("Server conneted to mongoDB");
  })
  .catch((err) => {
    console.log('Error connecting to DB');
    console.log(err);
  });

/*
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Server conneted to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

*/

