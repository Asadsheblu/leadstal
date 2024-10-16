import axios from 'axios';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const validateEmail = async (email, retries = 3) => {
  try {
    const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=efe53c7b499c4054a66e323b819c1f47&email=${email}`);
   console.log(response.data);
   
    return { email, ...response.data };
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      console.warn(`Rate limit hit, retrying in 1 second... (${retries} retries left)`);
      await delay(1000);  // Wait for 1 second before retrying
      return validateEmail(email, retries - 1);
    } else {
      console.error(`Error validating email ${email}:`, error.message);
      return { email, error: 'Validation failed due to rate limiting' };
    }
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ error: 'Invalid input. Please provide an array of email addresses.' });
    }

    try {
      const validationResults = await Promise.all(emails.map(email => validateEmail(email)));
      return res.status(200).json({ validationResults });
    } catch (error) {
      console.error('Error validating emails:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
