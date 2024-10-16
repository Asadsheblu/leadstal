import { useState } from "react";

export default function Home() {
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setResult(null);
      
      try {
        const res = await fetch('/api/cmsChecker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: websiteUrl }),
        });
  
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching website details:', error);
      }
  
      setLoading(false);
    };
  
    return (
      <div>
        <h1>CMS, Theme, Plugin, & Language Detection</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter website URL"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Check Website'}
          </button>
        </form>
  
        {result && (
          <div style={{ marginTop: '20px' }}>
            <h2>Results for: {websiteUrl}</h2>
            <p><strong>CMS:</strong> {result.cms || 'Not Found'}</p>
            <p><strong>Theme:</strong> {result.theme || 'Not Found'}</p>
            <h4>Plugins:</h4>
            <ul>
              {(result.plugins && result.plugins.length > 0) ? result.plugins.map((plugin, index) => (
                <li key={index}>{plugin}</li>
              )) : 'No Plugins Detected'}
            </ul>
            <p><strong>Programming Language:</strong> {result.programmingLanguage || 'Not Detected'}</p>
          </div>
        )}
      </div>
    );
  }
  