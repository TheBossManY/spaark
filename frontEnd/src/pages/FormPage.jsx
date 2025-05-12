// pages/FormPage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [year, setYear] = useState('');
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [photo3, setPhoto3] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const verified = localStorage.getItem('verified');

  

  const handleSubmit = async () => {
    if (!photo1 || !photo2 || !photo3) {
      alert('Please upload all 3 photos!');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('year', year);
    formData.append('photo1', photo1);
    formData.append('photo2', photo2);
    formData.append('photo3', photo3);

    try {
      await axios.post('http://localhost:3001/submit-form', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Form Submitted Successfully!');
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error submitting form');
    }
  };

  return (
    <div className="container">
      <h2>Fill Details</h2>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>
        {[1,2,3,4,5,6,7,8,9].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      
      <label>Upload Photo 1</label>
      <input type="file" accept="image/png, image/jpeg" onChange={(e) => setPhoto1(e.target.files[0])} />
      <label>Upload Photo 2</label>
      <input type="file" accept="image/png, image/jpeg" onChange={(e) => setPhoto2(e.target.files[0])} />
      <label>Upload Photo 3</label>
      <input type="file" accept="image/png, image/jpeg" onChange={(e) => setPhoto3(e.target.files[0])} />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default FormPage;
