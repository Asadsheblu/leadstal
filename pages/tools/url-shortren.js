// /pages/index.js
import { useState } from 'react';
import { nanoid } from 'nanoid';
import QRCode from 'qrcode';

export default function HomePage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [shortCode, setShortCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setQrCode('');

    try {
      // Generate a short code
      const generatedShortCode = nanoid(6);
      const generatedShortUrl = `${window.location.origin}/${generatedShortCode}`;
      
      // Store the URL and short code in localStorage
      localStorage.setItem(generatedShortCode, originalUrl);
      
      // Generate QR code
      const qrCodeDataUrl = await QRCode.toDataURL(generatedShortUrl);

      // Set state to display the short URL, QR code, and short code
      setShortUrl(generatedShortUrl);
      setQrCode(qrCodeDataUrl);
      setShortCode(generatedShortCode);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // Function to handle editing of the short URL
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save the edited short URL
  const handleSaveEdit = async () => {
    setIsEditing(false);
    try {
      // Remove the old short code from localStorage
      localStorage.removeItem(shortCode);

      // Extract new short code from edited URL and update localStorage
      const newShortCode = shortUrl.split('/').pop();
      localStorage.setItem(newShortCode, originalUrl);
      setShortCode(newShortCode);

      // Generate a new QR code for the edited URL
      const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);
      setQrCode(qrCodeDataUrl);
    } catch (err) {
      setError('Error generating QR code for edited URL');
    }
  };

  // Function to download the QR code
  const handleDownloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="container">
      <h1 className="title">URL Shortener with QR Code</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter a URL to shorten"
          className="input"
          required
        />
        <button type="submit" className="button">Shorten</button>
      </form>
      {error && <p className="error">{error}</p>}
      
      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          {isEditing ? (
            <input
              type="text"
              value={shortUrl}
              onChange={(e) => setShortUrl(e.target.value)}
              className="edit-input"
            />
          ) : (
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          )}
          {isEditing ? (
            <button onClick={handleSaveEdit} className="button">Save</button>
          ) : (
            <button onClick={handleEdit} className="button">Edit</button>
          )}

          {qrCode && (
            <div className="qrCode">
              <p>Scan this QR code:</p>
              <img src={qrCode} alt="QR Code" />
              <button onClick={handleDownloadQRCode} className="button">Download QR Code</button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        .title {
          font-size: 2em;
          margin-bottom: 20px;
          color: #333;
          text-align: center;
        }
        .form {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .input {
          padding: 10px;
          font-size: 1em;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 100%;
        }
        .edit-input {
          padding: 5px;
          font-size: 1em;
          margin: 5px 0;
          border: 1px solid #333;
          border-radius: 3px;
          width: 100%;
        }
        .button {
          padding: 10px;
          font-size: 1em;
          color: white;
          background-color: #0070f3;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 5px;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .result {
          margin-top: 20px;
          text-align: center;
        }
        .qrCode img {
          margin-top: 10px;
          width: 150px;
          height: 150px;
        }
        .error {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
