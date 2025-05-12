import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserSelection from './components/UserSelection';
import AdminPage from './components/admin'; // Assuming you created AdminPage
import AdminLogin from './components/adminlogin';
import LoginPage from './pages/LoginPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for User Selection Page */}
        <Route path="/" element={<UserSelection />} />
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        {/* Route for Admin Page */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/studentLogin" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OTPVerificationPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
