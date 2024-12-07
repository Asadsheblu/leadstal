import dbConnect from '../utils/dbConnect';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { userId } = req.query;

    const user = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.subscriptions || []);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
