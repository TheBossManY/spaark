import React from 'react';
import './UserSelection.css'; // Ensure to create this CSS file
import admin from '../assets/admin.png';
import faculty from '../assets/faculty.png';
import guard from '../assets/guard.png'
const UserSelection = () => {
  return (
    <div className="user-selection">
      <h1 className="heading">Choose Type of User</h1>
      <div className="tiles-container">
        <a href="/adminlogin"><div className="tile">
          <img
            src={admin} // Replace with a relevant Admin image URL
            alt="Admin"
            className="tile-image"
          />
          <h2 className="tile-title">Admin</h2>
        </div></a>
        <a href="https://campusguard.netlify.app/index2.html"><div className="tile">
          <img
            src={faculty} // Replace with a relevant Faculty image URL
            alt="Faculty"
            className="tile-image"
          />
          <h2 className="tile-title">Faculty</h2>
        </div></a>
        
        <a href="https://campusguard.netlify.app/index2.html"><div className="tile">
          <img
            src={guard} // Replace with a relevant Guard image URL
            alt="Guard"
            className="tile-image"
          />
          <h2 className="tile-title">Guard</h2>
        </div></a>
        
      </div>
    </div>
  );
};

export default UserSelection;
