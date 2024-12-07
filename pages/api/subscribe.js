// pages/api/subscribe.js
import { connectToDatabase } from '../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      const db = await connectToDatabase();

      // Add email to User's subscriptions
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Add email to subscriptions array
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $push: { subscriptions: email } }
      );

      res.status(200).json({ message: 'Subscribed successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
