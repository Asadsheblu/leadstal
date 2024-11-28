// /pages/ScanQRCode.js
import { useState } from 'react';
import jsQR from 'jsqr';

export default function ScanQRCode() {
  const [scannedData, setScannedData] = useState('');
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null); // প্রিভিউ ইমেজ রাখার জন্য নতুন স্টেট

  // QR কোড ইমেজ থেকে স্ক্যান করা
  const handleScanQR = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result); // প্রিভিউ ইমেজ সেট করা

      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setScannedData(code.data);
          setError('');
        } else {
          setError('No QR code found in the image.');
        }
      };
    };
    reader.readAsDataURL(file);
  };

  // স্ক্যান করা ডেটা কপি করা
  const handleCopy = () => {
    navigator.clipboard.writeText(scannedData);
    alert('Scanned data copied to clipboard!');
  };

  return (
    <div className="container">
      <h1 className="title">Scan QR code from image</h1>
      <p className="description">Simply upload an image or take a photo of a QR code to reveal its content</p>

      <div className="upload-section">
        <label htmlFor="file-input" className="upload-label">
          <span role="img" aria-label="upload">✔️</span> Select QR Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleScanQR}
          id="file-input"
          className="file-input"
        />
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="QR Preview" />
          </div>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {scannedData && (
        <div className="result-section">
          <h2>Scanned Data</h2>
          <textarea readOnly value={scannedData} className="scanned-data" />
          <button onClick={handleCopy} className="copy-button">📋 Copy Results</button>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .description {
          font-size: 16px;
          color: #666;
          margin-bottom: 20px;
        }
        .upload-section {
          border: 2px dashed #FFC107;
          padding: 20px;
          border-radius: 8px;
          background-color: #FFF9E6;
          margin-bottom: 20px;
          position: relative;
        }
        .upload-label {
          font-size: 18px;
          font-weight: bold;
          color: #FFA000;
          cursor: pointer;
        }
        .file-input {
          display: none;
        }
        .image-preview {
          margin-top: 10px;
        }
        .image-preview img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          border: 1px solid #ddd;
        }
        .error {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }
        .result-section {
          background-color: #E8F5E9;
          border: 2px solid #2E7D32;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }
        .scanned-data {
          width: 100%;
          height: 100px;
          padding: 10px;
          font-size: 16px;
          margin-top: 10px;
          resize: none;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .copy-button {
          margin-top: 10px;
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #2979FF;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .copy-button:hover {
          background-color: #1565C0;
        }
      `}</style>
    </div>
  );
}
