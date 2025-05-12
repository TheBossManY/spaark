// pages/OTPVerificationPage.jsx

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OTPVerificationPage() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:3001/verify-otp', { email, otp });
      localStorage.setItem('verified', true);
      alert('OTP Verified!');
      navigate('/form');
    } catch (err) {
      console.error(err);
      alert('Invalid OTP');
    }
  };

  return (
    <div className="container">
      <h2>Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
}

export default OTPVerificationPage;
