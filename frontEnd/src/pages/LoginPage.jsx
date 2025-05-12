// pages/LoginPage.jsx

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:3001/send-otp', { email });
      localStorage.setItem('email', email);
      alert('OTP sent to your email!');
      navigate('/verify-otp');
    } catch (err) {
      console.error(err);
      alert('Error sending OTP');
    }
  };

  return (
    <div className="container">
      <h2>Login - Send OTP</h2>
      <input
        type="email"
        placeholder="Enter your scholar email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
}

export default LoginPage;
