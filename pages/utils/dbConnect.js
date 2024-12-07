import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let cachedDb = null;

export default async function dbConnect() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await client.connect();
    cachedDb = client.db(); // Default database
    console.log('MongoDB connected');
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
