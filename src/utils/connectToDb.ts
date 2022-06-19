import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI!;

const connectToDb = async () => {
  const connection = await mongoose.connect(mongoURI);
  console.log(`Mongodb Connected:`, connection.connection.host);
};

export default connectToDb;
