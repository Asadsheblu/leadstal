import dbConnect from '../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // Add email to User's subscriptions
    const user = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming that user will have a `subscriptions` array to hold emails
    const updatedUser = await mongoose.connection.db.collection('users').updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $push: { subscriptions: email } }
    );

    res.status(200).json({ message: 'Subscribed successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
