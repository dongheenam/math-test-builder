import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
type MongooseState = {
  mongoose: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};
declare global {
  var mongooseState: MongooseState | undefined;
}

async function connectMongoose() {
  let cached = global.mongooseState;
  if (!cached) {
    cached = global.mongooseState = { mongoose: null, promise: null };
  }

  if (cached.mongoose) {
    return cached.mongoose;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI as string, options)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.mongoose = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.mongoose;
}

export default connectMongoose;
