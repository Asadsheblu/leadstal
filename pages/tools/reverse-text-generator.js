import { useState } from 'react';

// Transformation functions
const reverseText = (text) => text.split('').reverse().join('');
const flipText = (text) => [...text].map(flipChar).join('');
const reverseWording = (text) => text.split(' ').reverse().join(' ');
const flipWording = (text) => text.split(' ').map(flipChar).join(' ');
const reverseEachWord = (text) => text.split(' ').map(word => word.split('').reverse().join('')).join(' ');
const upsideDownText = (text) => text.split('').reverse().join('');

// Helper function to flip characters (mirror effect)
const flipChar = (char) => {
  const flipMap = {
    a: '\u0250', b: 'q', c: '\u0254', d: 'p', e: '\u01DD', f: '\u025F', g: '\u0183', h: '\u0265',
    i: '\u0131', j: '\u027E', k: '\u029E', l: '\u0283', m: '\u026F', n: 'u', o: 'o', p: 'd',
    q: 'b', r: '\u0279', s: 's', t: '\u0287', u: 'n', v: '\u028C', w: '\u028D', x: 'x', y: '\u028E', z: 'z'
  };
  return flipMap[char.toLowerCase()] || char;
};

export default function ReverseTextGenerator() {
  const [text, setText] = useState('');

  return (
    <div style={styles.container}>
      <h1>Reverse Text Generator</h1>

      {/* Textarea for input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your content here"
        rows="5"
        style={styles.textarea}
      />

      {/* Transformation Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => setText(reverseText(text))}>Reverse Text</button>
        <button style={styles.button} onClick={() => setText(flipText(text))}>Flip Text</button>
        <button style={styles.button} onClick={() => setText(reverseWording(text))}>Reverse Wording</button>
        <button style={styles.button} onClick={() => setText(flipWording(text))}>Flip Wording</button>
        <button style={styles.button} onClick={() => setText(reverseEachWord(text))}>Reverse each word's Lettering</button>
        <button style={styles.button} onClick={() => setText(upsideDownText(text))}>Upside Down</button>
      </div>

      {/* Reset Button */}
      <button style={styles.resetButton} onClick={() => setText('')}>
        <span role="img" aria-label="delete">🗑️</span> Clear Text
      </button>
    </div>
  );
}

// Styles
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
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '14px',
  },
  resetButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
};
