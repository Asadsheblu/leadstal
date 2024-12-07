// pages/api/register.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from "../utils/dbConnect";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const db = await connectToDatabase();

      // Check if user exists
      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists!' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the User collection
      const newUser = await db.collection('users').insertOne({
        email,
        password: hashedPassword,
      });

      // Dynamically get the domain name from the request headers
      const domain = req.headers.host; // This will give the domain of the incoming request

      // Generate script tag with unique userId and the active domain URL
      const scriptTag = `<script async src="https://${domain}/api/snippet?id=${newUser.insertedId}"></script>`;

      // Generate JWT Token
      const token = jwt.sign({ userId: newUser.insertedId }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({
        message: 'User created successfully!',
        scriptTag,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
