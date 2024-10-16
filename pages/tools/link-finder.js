import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/linkscraper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery: query }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.filePath);
      } else {
        setError(data.error || 'Failed to scrape LinkedIn profiles.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>LinkedIn Profile Scraper</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter LinkedIn search query"
        className="input"
      />
      <button onClick={handleScrape} disabled={loading}>
        {loading ? 'Scraping...' : 'Scrape LinkedIn'}
      </button>

      {error && <p className="error">{error}</p>}
      {result && <a href={result} className="download-link">Download Excel File</a>}

      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .input {
          padding: 10px;
          width: 100%;
          margin-bottom: 20px;
        }
        button {
          padding: 10px 20px;
          background-color: #0073b1;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        button:disabled {
          background-color: #ccc;
        }
        .error {
          color: red;
        }
        .download-link {
          margin-top: 20px;
          display: inline-block;
          background-color: #28a745;
          color: white;
          padding: 10px;
          border-radius: 5px;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
