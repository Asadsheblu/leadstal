// utils/dbConnect.js
import { MongoClient } from 'mongodb';

let cachedClient = null;
let cachedDb = null;

export const connectToDatabase = async () => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db();  // Default database (can be configured in the URI)
  cachedClient = client;
  cachedDb = db;

  return db;
};
