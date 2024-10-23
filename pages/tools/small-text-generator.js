import { useState } from 'react';

// Functions for different transformations
const toSmallText = (text) => text.toLowerCase().replace(/[a-z]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x1d00));
const toUpsideDownText = (text) => text.split('').reverse().join('');
const toSmallCaps = (text) => text.replace(/[a-z]/g, (char) => char.toUpperCase());
const toBoldText = (text) => text.replace(/[a-z]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x1d3e));
const toBubbleText = (text) => text.replace(/[a-zA-Z]/g, (char) => bubbleChar(char));
const toBackwardsText = (text) => text.split('').reverse().join('');

// Helper function to convert to bubble characters
const bubbleChar = (char) => {
  const bubbles = {
    'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
    'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ'
  };
  return bubbles[char] || char;
};

export default function SmallTextGenerator() {
  const [text, setText] = useState('');
  const [originalText, setOriginalText] = useState('');

  const handleTransformation = (transformFunc) => {
    if (!originalText) setOriginalText(text); // Save original text on first transformation
    setText(transformFunc(text));
  };

  const resetText = () => {
    setText(originalText);
    setOriginalText(''); // Reset original text
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard');
  };

  const downloadAsTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'transformed_text.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={styles.container}>
      <h1>Small Text Generator</h1>

      {/* Textarea for input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here"
        rows="5"
        style={styles.textarea}
      />

      {/* Transformation Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => handleTransformation(toSmallText)}>Small Text</button>
        <button style={styles.button} onClick={() => handleTransformation(toUpsideDownText)}>Upside Down</button>
        <button style={styles.button} onClick={() => handleTransformation(toSmallCaps)}>Small Caps</button>
        <button style={styles.button} onClick={() => handleTransformation(toBoldText)}>Bold</button>
        <button style={styles.button} onClick={() => handleTransformation(toBubbleText)}>Bubble</button>
        <button style={styles.button} onClick={() => handleTransformation(toBackwardsText)}>Backwards</button>
      </div>

      {/* Control Buttons */}
      <div style={styles.controlGroup}>
        <button style={styles.controlButton} onClick={copyToClipboard}>Copy</button>
        <button style={styles.controlButton} onClick={downloadAsTxt}>Download as TXT</button>
        <button style={styles.controlButton} onClick={resetText}>Original Text</button>
      </div>
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
    marginBottom: '20px',
  },
  button: {
    margin: '5px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '14px',
  },
  controlGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  controlButton: {
    backgroundColor: '#0070f3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
