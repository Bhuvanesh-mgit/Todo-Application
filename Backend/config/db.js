import mongoose from "mongoose";

const connectDb = async () => {
  try {
    let connect = await mongoose.connect(
      "mongodb://bhuvaneshm444_db_user:3t5mdC1v1oG7iIsp@ac-vzr9ltt-shard-00-00.89kbhnr.mongodb.net:27017,ac-vzr9ltt-shard-00-01.89kbhnr.mongodb.net:27017,ac-vzr9ltt-shard-00-02.89kbhnr.mongodb.net:27017/?ssl=true&replicaSet=atlas-17fwdh-shard-0&authSource=admin&appName=Cluster0",
    );
    console.log("Db Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;

// mongodb+srv://bhuvaneshm444_db_user:3t5mdC1v1oG7iIsp@cluster0.89kbhnr.mongodb.net/?appName=Cluster0
