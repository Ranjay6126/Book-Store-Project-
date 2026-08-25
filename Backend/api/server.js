import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import booksRoute from "../routes/booksRoute.js";

const app = express();

//Middleware for parsing request body
// Limit raised so base64 cover images sent from the browser fit through.
app.use(express.json({ limit: "10mb" }));

//Middleware for handling CORS POLICY — allow all origins so the deployed
//frontend can talk to this API from any domain.
app.use(cors());

/**
 * Connect to MongoDB lazily and reuse the connection across warm invocations,
 * so serverless requests after the first one skip the handshake.
 */
let isConnected = false;
async function connectDB() {
  if (isConnected) return;

  const mongoDBURL = process.env.MONGODB_URL;
  if (!mongoDBURL) {
    throw new Error("MONGODB_URL is required. Set it in your Vercel project environment variables.");
  }

  await mongoose.connect(mongoDBURL);
  isConnected = true;
}

//Ensure every request has a database connection before hitting the routes.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Root route
app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  return res.status(200).send("Hello Felling good Now");
});

//Middlware for the /books routes
app.use("/books", booksRoute);

//EXPORT — required for Vercel Serverless Functions
export default app;
