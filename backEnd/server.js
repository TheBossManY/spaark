const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const upload = multer({ dest: 'temp_uploads/' });

// Define paths
const TARGET_BASE_PATH = "C:/Users/PRAGALBH/Dropbox/PC/Desktop/ALL OF WEB DEV/Final Year Project SPAARK/labels";
const LABELS_DIR = TARGET_BASE_PATH;
const STUDENT_DATA_PATH = "C:/Users/PRAGALBH/Dropbox/PC/Desktop/ALL OF WEB DEV/students_data_200_with_roll.json";

// Upload route: Handles student details and photo uploads
app.post('/upload', upload.fields([
  { name: 'photo1' }, { name: 'photo2' }, { name: 'photo3' }
]), (req, res) => {
  const { name, course, status, rollnumber, college } = req.body;

  // Read the student database to find the exam form status based on roll number
  fs.readFile(STUDENT_DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading student data:', err);
      return res.status(500).json({ error: 'Could not read student data file' });
    }

    try {
      const students = JSON.parse(data);
      const student = students.find(s => String(s.rollnumber) === String(rollnumber));

      if (!student) {
        return res.status(404).json({ message: "Student not found in database" });
      }

      // Default exam form status if student is found
      const examFormStatus = student["exam-form"] || "NA"; // Use the database value or set as "NA" if not found

      // Create a folder for the student if not already exists
      const studentFolder = path.join(TARGET_BASE_PATH, name);
      fs.mkdirSync(studentFolder, { recursive: true });

      // Define mapping for file renaming
      const renameMap = {
        photo1: '1',
        photo2: '2',
        photo3: '3'
      };

      // Handle file renaming and saving
      for (let key in req.files) {
        const file = req.files[key][0];
        const ext = path.extname(file.originalname);  // Retain original file extension
        const newFileName = renameMap[key] + ext;
        const newPath = path.join(studentFolder, newFileName);
        fs.renameSync(file.path, newPath);
      }

      // Save the student details as JSON in the student's folder
      const dataToSave = {
        name,
        course,
        status,
        rollnumber,
        college,
        "examform": examFormStatus // Use status from the database
      };

      // Write the details to 'details.json' file
      fs.writeFileSync(
        path.join(studentFolder, 'details.json'),
        JSON.stringify(dataToSave, null, 2)
      );

      res.status(200).send('Data saved successfully');
    } catch (parseErr) {
      console.error('Error parsing student data:', parseErr);
      return res.status(500).json({ error: 'Invalid JSON format in student data file' });
    }
  });
});

// Get list of student folders
app.get('/get-labels', (req, res) => {
  fs.readdir(LABELS_DIR, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Unable to read labels directory' });
    }

    const folders = files
      .filter((file) => file.isDirectory())
      .map((dir) => dir.name);

    res.json(folders);
  });
});

// API to get exam-form and status-of-form based on rollnumber
app.get('/check-exam-form-status', (req, res) => {
  const { rollnumber } = req.query;

  if (!rollnumber) {
    return res.status(400).json({ error: "rollnumber query parameter is required" });
  }

  fs.readFile(STUDENT_DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading student data:', err);
      return res.status(500).json({ error: 'Could not read student data file' });
    }

    try {
      const students = JSON.parse(data);
      const student = students.find(s => String(s.rollnumber) === String(rollnumber));

      if (student) {
        return res.json({
          name: student.name,
          rollnumber: student.rollnumber,
          "exam-form": student["exam-form"],
          "status-of-form": student["status-of-form"]
        });
      } else {
        return res.status(404).json({ message: "Student not found" });
      }
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return res.status(500).json({ error: 'Invalid JSON format in student data file' });
    }
  });
});

// Start server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
