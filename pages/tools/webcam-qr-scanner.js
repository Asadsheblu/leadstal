// /pages/WebcamQRCodeScanner.js
import { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function WebcamQRCodeScanner() {
  const [scannedData, setScannedData] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [html5QrCode, setHtml5QrCode] = useState(null);
  const [error, setError] = useState('');

  const handleStartScanner = async () => {
    setScannedData('');
    setError('');
    if (cameraOpen) {
      // Stop and clear the camera
      html5QrCode.stop().then(() => {
        try {
          html5QrCode.clear(); // Clear the HTML5 QR code instance
        } catch (error) {
          console.error("Error clearing the QR code scanner:", error);
        }
        setCameraOpen(false);
        setHtml5QrCode(null);
      }).catch((err) => {
        console.error("Error stopping the camera:", err);
      });
    } else {
      try {
        const qrCodeScanner = new Html5Qrcode("reader");
        setHtml5QrCode(qrCodeScanner);
        
        await qrCodeScanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            setScannedData(decodedText);
            qrCodeScanner.stop().then(() => {
              try {
                qrCodeScanner.clear(); // Clear the QR code scanner
              } catch (error) {
                console.error("Error clearing the QR code scanner:", error);
              }
              setCameraOpen(false);
              setHtml5QrCode(null);
            });
          },
          (errorMessage) => {
            console.log("QR Code not detected.", errorMessage);
          }
        );
        setCameraOpen(true);
      } catch (err) {
        console.error("Camera open error:", err);
        setError("Failed to open camera. Please allow camera access or try a different browser.");
        setCameraOpen(false);
        setHtml5QrCode(null);
      }
    }
  };

  // স্ক্যান করা ডেটা কপি করা
  const handleCopy = () => {
    navigator.clipboard.writeText(scannedData);
    alert("Scanned data copied to clipboard!");
  };

  return (
    <div className="container">
      <h1 className="title">Webcam QR code scanner</h1>
      <p className="description">Click "Open camera" & point the QR toward it</p>

      <div className="scanner-section">
        <div className="camera-section">
          <h2>📷 Webcam</h2>
          <div id="reader" className="camera-view">
            {!cameraOpen && <p>📷 Make sure to allow camera access!</p>}
          </div>
          <button onClick={handleStartScanner} className="camera-button">
            {cameraOpen ? "Stop Camera" : "Open Camera"}
          </button>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="result-section">
          <h2>📋 Scanned Data</h2>
          <textarea readOnly value={scannedData || "Scan a QR code to view the results here."} className="scanned-data" />
          <button onClick={handleCopy} className="copy-button" disabled={!scannedData}>📋 Copy Results</button>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 900px;
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
        .scanner-section {
          display: flex;
          justify-content: space-around;
          gap: 20px;
        }
        .camera-section, .result-section {
          width: 45%;
          padding: 15px;
          border-radius: 8px;
        }
        .camera-section {
          background-color: #FFF9E6;
          border: 2px solid #FFC107;
        }
        .result-section {
          background-color: #E8F5E9;
          border: 2px solid #2E7D32;
        }
        .camera-view {
          width: 100%;
          height: 250px;
          background-color: #F0F0F0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          margin-bottom: 10px;
          position: relative;
        }
        .camera-button {
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #424242;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .error {
          color: red;
          margin-top: 10px;
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
        .copy-button:disabled {
          background-color: #B0BEC5;
          cursor: not-allowed;
        }
        .copy-button:hover:not(:disabled) {
          background-color: #1565C0;
        }
      `}</style>
    </div>
  );
}
