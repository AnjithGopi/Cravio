import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoURL = process.env.MONGODB_URL;

  if (!mongoURL) {
    throw new Error("MongoURL is not defined");
  }

  await mongoose.connect(mongoURL);
}
