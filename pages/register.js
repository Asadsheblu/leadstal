import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [scriptTag, setScriptTag] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setMessage('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('/api/register', { email, password });
      setMessage('Registration successful!');
      setScriptTag(response.data.scriptTag);  // Getting the script tag from API response
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
      {scriptTag && (
        <div>
          <h4>Install the following script tag on your website to get the Subscribe Box:</h4>
          <code>{scriptTag}</code>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
