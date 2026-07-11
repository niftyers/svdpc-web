import mongoose from "mongoose";

const MONGO_URI = process.env.DATABASE_URI || "";

if (!MONGO_URI) {
  throw new Error(
    "Please define the DATABASE_URI environment variable inside .env.local"
  );
}

interface IMongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

declare global {
  var mongooseCache: IMongooseCache | undefined;
}

const cached: IMongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

export const MongoDbConnect = async (): Promise<mongoose.Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
