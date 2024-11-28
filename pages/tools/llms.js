import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Generating llms.txt...');

    // API রিকোয়েস্ট পাঠানোর আগে URL ঠিক আছে কিনা তা চেক করুন
    if (!url) {
      setMessage('Please enter a URL.');
      return;
    }

    try {
      const response = await fetch('/api/generate-llms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Content-Type সঠিকভাবে সেট করা
        },
        body: JSON.stringify({ url }), // JSON.stringify দিয়ে URL পাঠানো
      });

      const data = await response.json();

      if (data.success) {
        setMessage('llms.txt file generated successfully. You can download it now!');
      } else {
        setMessage(`Failed to generate llms.txt: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting URL:', error);
      setMessage('Error submitting URL.');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>LLMS Tool</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '60%', padding: '10px', fontSize: '16px' }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginLeft: '10px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Generate llms.txt
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
