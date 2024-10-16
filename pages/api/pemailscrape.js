import axios from 'axios';

const possibleEmailFormats = (firstName, lastName, domain) => {
  const formats = [
    `${firstName}.${lastName}@${domain}`,
    `${firstName}${lastName}@${domain}`,
    `${firstName[0]}${lastName}@${domain}`,
    `${firstName}@${domain}`,
    `${lastName}@${domain}`,
  ];
  return formats;
};

const findEmail = async (formats) => {
  // This is a placeholder function. You would typically use an email validation service/API
  for (let format of formats) {
    try {
      // Simulate checking the email by making an API request
      const response = await axios.get(`https://api.email-validator.net/api/verify?EmailAddress=${format}`);
      if (response.data.status === 'valid') {
        return format;
      }
    } catch (error) {
      // Handle errors or invalid responses
    }
  }
  return null;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, companyDomain } = req.body;

    if (!firstName || !lastName || !companyDomain) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const formats = possibleEmailFormats(firstName.toLowerCase(), lastName.toLowerCase(), companyDomain.toLowerCase());
    const email = await findEmail(formats);

    if (email) {
      res.status(200).json({ email });
    } else {
      res.status(404).json({ email: 'No email found' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
