import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ uid: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = () => {
    if (credentials.uid === 'Pragalbh' && credentials.password === '123456') {
      navigate('/admin'); // Redirect to the admin page
    } else {
      alert('Invalid UID or Password.');
    }
  };
  

  return (
    <div style={styles.container} >
      <h2 style={styles.header}>Admin Login</h2>
      <div style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="uid"
          placeholder="UID"
          value={credentials.uid}
          onChange={handleInputChange}
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    background: 'linear-gradient(rgba(127, 66, 167, 0.45),rgba(102, 0, 197, 0.82),rgba(83, 0, 160, 0.94))',
    color: '#fff',
    padding: '18px',
    borderRadius: '15px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AdminLogin;
