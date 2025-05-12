// src/components/StudentForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    status: '',
    rollnumber: '',
    college: ''
  });

  const [photos, setPhotos] = useState([]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    photos.forEach((photo, i) => data.append(`photo${i + 1}`, photo));

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:3001/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Student data uploaded successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to upload');
    }
  };

  return (
    <div className="admin-form-container">
      <form onSubmit={handleSubmit} className="admin-form">
        <h3 className="form-heading">Upload Student Data</h3>
        
        <input className="form-input" type="text" name="name" placeholder="Student Name" onChange={handleChange} required />
        <input className="form-input" type="text" name="course" placeholder="Course" onChange={handleChange} required />
        <input className="form-input" type="text" name="status" placeholder="Status" onChange={handleChange} required />
        <input className="form-input" type="text" name="rollnumber" placeholder="Roll Number" onChange={handleChange} required />
        <input className="form-input" type="text" name="college" placeholder="College" onChange={handleChange} required />
        
        <input className="file-input" type="file" multiple accept="image/*" onChange={handlePhotoChange} required />
        
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminPage;
