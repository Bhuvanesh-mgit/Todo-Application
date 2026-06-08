import mongoose from "mongoose";

const connectDb = async () => {
  try {
    let connect = await mongoose.connect(
    
    );
    console.log("Db Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;


