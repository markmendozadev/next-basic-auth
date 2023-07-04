import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB is connected Successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running." + err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Some went wrong!");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
