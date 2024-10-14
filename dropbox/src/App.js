import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [file, setFile] = useState(null);
    const [resultMessage, setResultMessage] = useState('');

    // Handle file selection
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:5000/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                setResultMessage('File uploaded successfully');
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                setResultMessage('Error uploading file');
            });
    };

    return (
        <div>
            <h1>Upload File to Dropbox</h1>
            <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload File</button>
            </form>
            {resultMessage && <p>{resultMessage}</p>}
        </div>
    );
}

export default App;
