import { MongoMemoryServer } from "mongodb-memory-server";
import config from "./config.js";
import mongoose, { ConnectOptions } from "mongoose";

let mongod: MongoMemoryServer | null = null;

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
  if (config.ENV === "test") {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    return mongoose.connect(uri);
  }
  if (config.ENV === "development") {
    mongoose.set("debug", true);
    return await mongoose.connect(config.DATABASE_URI, options);
  }
  return await mongoose.connect(config.DATABASE_URI, options);
};

const dropDb = async () => {
  if (mongod) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  }
};

const dropCollections = async () => {
  if (mongod) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.drop();
    }
  }
};

export { connectDb, dropCollections, dropDb };
