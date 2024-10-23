import { useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [counts, setCounts] = useState({
    words: 0,
    characters: 0,
    sentences: 0,
    syllables: 0,
    readTime: 0,
  });

  // Function to calculate word count, character count, sentence count, syllables, and read time
  const countWords = () => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const characters = text.length;
    const sentences = (text.match(/[\w|\)][.?!](\s|$)/g) || []).length;
    const syllables = text.replace(/[^aeiouyAEIOUY]/g, "").length;
    const readTime = Math.ceil(words / 200); // assuming 200 words per minute reading speed

    setCounts({ words, characters, sentences, syllables, readTime });
  };

  // Handle file upload and process the text from the file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setText(fileContent);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Professional Word Counting System</h1>

      {/* Display Statistics */}
      <div style={styles.statsContainer}>
        <div style={styles.stat}>Words: {counts.words}</div>
        <div style={styles.stat}>Characters: {counts.characters}</div>
        <div style={styles.stat}>Sentences: {counts.sentences}</div>
        <div style={styles.stat}>Syllables: {counts.syllables}</div>
        <div style={styles.stat}>Read Time: {counts.readTime} Min</div>
      </div>

      {/* Textarea for input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="10"
        placeholder="Enter text here for word count."
        style={styles.textarea}
      />

      {/* File upload for text files */}
      <input
        type="file"
        onChange={handleFileChange}
        accept=".txt"
        style={styles.fileInput}
      />

      {/* Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={countWords}>
          Count Words
        </button>
        <button style={{ ...styles.button, backgroundColor: '#f39c12' }}>
          Grammar Check
        </button>
      </div>
    </div>
  );
}

// Styling (Inline CSS)
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    fontSize: '16px',
  },
  stat: {
    margin: '0 10px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  fileInput: {
    marginBottom: '20px',
    fontSize: '16px',
    padding: '10px',
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
