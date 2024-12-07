// pages/api/snippet.js
import { connectToDatabase } from "../utils/dbConnect";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const db = await connectToDatabase();

    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return HTML for the subscribe box
    res.status(200).send(`
      <div id="subscribe-box" style="position: fixed; bottom: 10px; right: 10px; background-color: #fff; padding: 10px; border: 1px solid #ccc;">
        <form id="subscribe-form">
          <input type="email" id="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
        <p id="message"></p>
      </div>
      <script>
        document.getElementById('subscribe-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = document.getElementById('email').value;
          const userId = "${id}";
          
          const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, userId }),
          });
          
          const result = await response.json();
          document.getElementById('message').innerText = result.message;
        });
      </script>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
