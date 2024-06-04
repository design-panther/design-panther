const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3000;

app.use(cors());

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Configure multer for file handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dataDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// POST endpoint to handle file upload
app.post('/copyFile', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(`File was copied successfully to ${req.file.path}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
