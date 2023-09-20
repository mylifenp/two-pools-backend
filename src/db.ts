import config from "./config.js";
import mongoose, { ConnectOptions } from "mongoose";

const options: ConnectOptions = {
  auth: {
    username: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
  },
  dbName: config.DATABASE_NAME,
};

const connectDb = async (): Promise<typeof mongoose> => {
  mongoose.set("toJSON", {
    virtuals: true,
    // transform: (doc, converted) => {
    //   delete converted._id;
    // },
  });
  if (config.ENV === "development") {
    mongoose.set("debug", true);
  }
  return await mongoose.connect(config.DATABASE_URI, options);
};

const dropDb = async () => {
  if (config.ENV === "test") {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
};

const dropCollections = async () => {
  if (config.ENV === "test") {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.drop();
    }
  }
};

export { connectDb, dropCollections, dropDb };
