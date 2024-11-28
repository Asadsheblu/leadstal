// /pages/api/resolve.js
import db from '../../utils/db';

export default async function handler(req, res) {
  const { code } = req.query;

  const urlEntry = await db.collection('urls').findOne({ shortCode: code });
  if (urlEntry) {
    res.json({ originalUrl: urlEntry.originalUrl });
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
}
