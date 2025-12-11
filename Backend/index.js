// import express from "express";

// import { PORT, mongoDBURL } from "./config.js";

// import mongoose from "mongoose";

// import booksRoute from './routes/booksRoute.js';
// import cors from 'cors'

// const app = express();

// //Middleware for parsing request body
// app.use(express.json());

// //Middleware for handling CORS POLICY

// //Option1:=> allow all origin with default of cors(*)

// app.use(cors());


// //Option2: Allow Custom Origins // CORS setup //
// // app.use(
// //     cors({
// //         origin: 'http://localhost:3000',
// //         method: ['GET','POST','PUT','DELETE'],
// //         allowedHeaders: ['Content-Type'],
// //     })
// // );

// //Root route
// app.get("/", (req, res) => {
//   console.log(req);
//   res.set("Cache-Control", "no-store");
//   return res.status(200).send("Hello Felling good Now");
// });

// //Middlware for the /books routes
// app.use("/books", booksRoute);


// // MongoDB + server start
// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log("App or MongoDB connected to database");

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });


import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { mongoDBURL } from "../config.js";
import booksRoute from "../routes/booksRoute.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB (once)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(mongoDBURL);
  isConnected = true;
  console.log("MongoDB Connected (Vercel Serverless)");
}

// Root Route
app.get("/", async (req, res) => {
  await connectDB();
  res.set("Cache-Control", "no-store");
  return res.status(200).send("Hello Feeling Good Now");
});

// Books Route
app.use("/books", async (req, res, next) => {
  await connectDB();
  next();
}, booksRoute);

// EXPORT — important for Vercel
export default app;
