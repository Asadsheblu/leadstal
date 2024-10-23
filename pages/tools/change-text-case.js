import { useState } from 'react';

export default function TextCase() {
  const [text, setText] = useState('');

  // Count characters and words
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  // Transformations
  const toSentenceCase = () => {
    setText(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase());
  };

  const toLowerCase = () => {
    setText(text.toLowerCase());
  };

  const toUpperCase = () => {
    setText(text.toUpperCase());
  };

  const toCapitalizedCase = () => {
    setText(
      text
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const toAlternatingCase = () => {
    setText(
      text
        .split('')
        .map((char, index) =>
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        )
        .join('')
    );
  };

  const toToggleCase = () => {
    setText(
      text
        .split('')
        .map((char) =>
          char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase()
        )
        .join('')
    );
  };

  const toHyphenCase = () => {
    setText(text.toLowerCase().replace(/\s+/g, '-'));
  };

  const toSnakeCase = () => {
    setText(text.toLowerCase().replace(/\s+/g, '_'));
  };

  // Reset Text
  const resetText = () => {
    setText('');
  };

  // Copy to Clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard');
  };

  return (
    <div style={styles.container}>
      <h1>Text Transformation Tool</h1>

      {/* Character Count and Word Count */}
      <p>
        Character Count: {charCount} - Word Count: {wordCount}
      </p>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste content here"
        rows="5"
        style={styles.textarea}
      />

      {/* Transformation Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={toSentenceCase}>
          Sentence case
        </button>
        <button style={styles.button} onClick={toLowerCase}>
          lower case
        </button>
        <button style={styles.button} onClick={toUpperCase}>
          UPPER CASE
        </button>
        <button style={styles.button} onClick={toCapitalizedCase}>
          Capitalized Case
        </button>
        <button style={styles.button} onClick={toAlternatingCase}>
          aLtErNaTiNg cAsE
        </button>
        <button style={styles.button} onClick={toToggleCase}>
          ToGGLE cASE
        </button>
        <button style={styles.button} onClick={toHyphenCase}>
          (-) hyphen-case
        </button>
        <button style={styles.button} onClick={toSnakeCase}>
          Snake_Case
        </button>
        <button style={styles.resetButton} onClick={resetText}>
          Reset
        </button>
        <button style={styles.copyButton} onClick={copyToClipboard}>
          Copy To Clipboard
        </button>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 15px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '14px',
  },
  resetButton: {
    padding: '10px 15px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: 'white',
    fontSize: '14px',
  },
  copyButton: {
    padding: '10px 15px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '14px',
  },
};

