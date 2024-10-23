import { useState } from 'react';

export default function SitemapGenerator() {
  const [url, setUrl] = useState('');
  const [changeFreq, setChangeFreq] = useState('None');
  const [lastMod, setLastMod] = useState('None');
  const [dateTime, setDateTime] = useState('');
  const [priority, setPriority] = useState('None');

  const handleSubmit = () => {
    if (!url) {
      alert('Please enter a valid URL.');
      return;
    }

    // Simulating sitemap generation (this can be replaced with actual API calls)
    alert(`Sitemap generation started for: ${url}`);
    console.log({
      url,
      changeFreq,
      lastMod,
      dateTime: lastMod === 'UseDate' ? dateTime : 'N/A',
      priority,
    });

    // Redirect or simulate results after crawl (e.g., show sitemap details)
  };

  const reportProblem = () => {
    alert('Report functionality is not yet implemented.');
  };

  return (
    <div style={styles.container}>
      <h1>Sitemap Generator</h1>

      {/* URL Input */}
      <div style={styles.formGroup}>
        <label>Enter a valid URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://"
          style={styles.input}
        />
      </div>

      {/* Change Frequency Dropdown */}
      <div style={styles.formGroup}>
        <label>Change Frequency</label>
        <select value={changeFreq} onChange={(e) => setChangeFreq(e.target.value)} style={styles.select}>
          <option value="None">None</option>
          <option value="Always">Always</option>
          <option value="Hourly">Hourly</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Never">Never</option>
        </select>
      </div>

      {/* Last Modification Options */}
      <div style={styles.formGroup}>
        <label>Last Modification</label>
        <div>
          <label>
            <input
              type="radio"
              value="None"
              checked={lastMod === 'None'}
              onChange={() => setLastMod('None')}
            /> None
          </label>
          <label>
            <input
              type="radio"
              value="UseServer"
              checked={lastMod === 'UseServer'}
              onChange={() => setLastMod('UseServer')}
            /> Use server&#39;s response
          </label>
          <label>
            <input
              type="radio"
              value="UseDate"
              checked={lastMod === 'UseDate'}
              onChange={() => setLastMod('UseDate')}
            /> Use this date/time:
          </label>
          {lastMod === 'UseDate' && (
            <input
              type="date"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              style={styles.input}
            />
          )}
        </div>
      </div>

      {/* Priority Options */}
      <div style={styles.formGroup}>
        <label>Priority</label>
        <div>
          <label>
            <input
              type="radio"
              value="None"
              checked={priority === 'None'}
              onChange={() => setPriority('None')}
            /> None
          </label>
          <label>
            <input
              type="radio"
              value="Auto"
              checked={priority === 'Auto'}
              onChange={() => setPriority('Auto')}
            /> Automatically Calculated Priority
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={handleSubmit}>Start</button>
        <button style={styles.button} onClick={reportProblem}>Report Problem With Tool</button>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  button: {
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
