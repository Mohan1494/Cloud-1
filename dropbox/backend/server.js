const express = require('express');
const multer = require('multer');
const { Dropbox } = require('dropbox');
const fetch = require('isomorphic-fetch');
const fs = require('fs');
const app = express();
require('dotenv').config();
const port = 5000;

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Temporary storage

// Initialize Dropbox client
const dbx = new Dropbox({ 
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,  // Use the environment variable for the access token
    fetch 
});

// Test Dropbox connection (e.g., by checking the current account)
async function checkDropboxConnection() {
    try {
        const accountInfo = await dbx.usersGetCurrentAccount();
        console.log('Connected to Dropbox:', accountInfo);

        // Extract the result from the DropboxResponse
        const account = accountInfo.result;

        if (account && account.name && account.name.display_name) {
            console.log('Account Name:', account.name.display_name);
        } else {
            console.log('Unexpected response structure:', account);
        }
    } catch (error) {
        console.error('Failed to connect to Dropbox:', error.error || error);
    }
}

// Upload file to Dropbox
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const fileStream = fs.createReadStream(filePath);

        const dropboxResponse = await dbx.filesUpload({
            path: '/' + req.file.originalname,
            mode: { '.tag': 'add' },
            autorename: true,
            mute: false,
            contents: fileStream,
        });

        // Clean up temporary file
        fs.unlinkSync(filePath);

        res.status(201).json({ message: 'File uploaded successfully', data: dropboxResponse });
    } catch (error) {
        console.error('Error uploading file to Dropbox:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
});

// Start server and check Dropbox connection
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await checkDropboxConnection(); // Check connection to Dropbox when the server starts
});
