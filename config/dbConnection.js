import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection) console.log(`connected to mongoDB: ${connection.host}`);
  } catch (error) {
    console.log(e.message);
    process.exit(1);
  }
};

export default connectDB;
