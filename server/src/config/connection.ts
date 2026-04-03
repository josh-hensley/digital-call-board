import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.URI || "";
const db = async () => {
  try {
    mongoose.connect(URI);
  } catch (error) {
    console.error((error as Error).message);
  }
};

export default db;
