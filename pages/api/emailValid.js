// import axios from 'axios';

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// const validateEmail = async (email, retries = 3) => {
//   try {
//     const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=efe53c7b499c4054a66e323b819c1f47&email=${email}`);
//    console.log(response.data);
   
//     return { email, ...response.data };
//   } catch (error) {
//     if (error.response && error.response.status === 429 && retries > 0) {
//       console.warn(`Rate limit hit, retrying in 1 second... (${retries} retries left)`);
//       await delay(1000);  // Wait for 1 second before retrying
//       return validateEmail(email, retries - 1);
//     } else {
//       console.error(`Error validating email ${email}:`, error.message);
//       return { email, error: 'Validation failed due to rate limiting' };
//     }
//   }
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { emails } = req.body;

//     if (!emails || !Array.isArray(emails)) {
//       return res.status(400).json({ error: 'Invalid input. Please provide an array of email addresses.' });
//     }

//     try {
//       const validationResults = await Promise.all(emails.map(email => validateEmail(email)));
//       return res.status(200).json({ validationResults });
//     } catch (error) {
//       console.error('Error validating emails:', error.message);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
import dns from 'dns';
import nodemailer from 'nodemailer';

// ইমেইল ফরম্যাট যাচাই (সিন্ট্যাক্স চেক)
const validateEmailSyntax = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// ডোমেইনের MX রেকর্ড যাচাই
const validateEmailDomain = async (email) => {
  const domain = email.split('@')[1];

  return new Promise((resolve, reject) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        reject(new Error('Invalid domain or no MX records found'));
      } else {
        resolve(addresses);
      }
    });
  });
};

// SMTP যাচাই Nodemailer দিয়ে
const validateSMTP = async (email) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP সার্ভারের হোস্ট
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // .env.local থেকে ইউজার
      pass: process.env.SMTP_PASS, // .env.local থেকে পাসওয়ার্ড
    },
  });

  return new Promise((resolve, reject) => {
    transporter.verify(function(error, success) {
      if (error) {
        reject(new Error('SMTP validation failed: ' + error.message));
      } else {
        resolve('Valid');
      }
    });
  });
};

// API রিকোয়েস্ট হ্যান্ডলার
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
      return res.status(400).json({ message: 'Emails are required and should be an array' });
    }

    const validationResults = [];

    for (let email of emails) {
      // ইমেইল ফরম্যাট যাচাই
      if (!validateEmailSyntax(email)) {
        validationResults.push({
          email,
          deliverability: 'INVALID_SYNTAX',
        });
        continue;
      }

      try {
        // ডোমেইনের MX রেকর্ড যাচাই
        const mxRecords = await validateEmailDomain(email);

        // SMTP যাচাই
        const smtpResult = await validateSMTP(email);

        validationResults.push({
          email,
          deliverability: smtpResult,
          domain: email.split('@')[1],
          is_mx_found: { value: true },
          is_smtp_valid: { value: smtpResult === 'Valid' },
        });
      } catch (error) {
        validationResults.push({
          email,
          deliverability: 'INVALID',
          domain: email.split('@')[1],
          is_mx_found: { value: false },
          is_smtp_valid: { value: false },
        });
      }
    }

    return res.status(200).json({ validationResults });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
