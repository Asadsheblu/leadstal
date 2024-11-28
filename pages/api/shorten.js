// /pages/api/shorten.js
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { originalUrl } = req.body;

    // Generate a short code (without saving it anywhere)
    const shortCode = nanoid(6);
    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    // Generate QR code for the short URL
    const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);

    // Return short URL and QR code directly
    res.status(201).json({ shortUrl, qrCode: qrCodeDataUrl });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
