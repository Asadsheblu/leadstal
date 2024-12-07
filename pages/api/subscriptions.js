// pages/api/subscriptions.js
import { connectToDatabase } from '../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    try {
      const db = await connectToDatabase();

      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user.subscriptions || []);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
