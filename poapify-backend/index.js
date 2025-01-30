const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const multer = require('multer');
const axios = require('axios'); // ✅ Missing Import
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();

const app = express();

// Firebase Initialization
const serviceAccount = require('./serviceAccountKey.json');

if (!process.env.FIREBASE_DB_URL) {
    console.error('FIREBASE_DB_URL is missing. Please check your .env file.');
    process.exit(1);
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL,
});

const db = admin.database();

// ✅ Use `diskStorage` instead of `memoryStorage` (Fixes file upload issue)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files temporarily
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Debugging Middleware for Incoming Requests
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} - Body:`, req.body);
    next();
});

// ✅ Upload Image to Pinata (Fixed)
app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            console.error('No file uploaded.');
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('Uploading file to Pinata...');

        const fileStream = fs.createReadStream(req.file.path);
        const formData = new FormData();
        formData.append('file', fileStream);

        // Configure Headers for Pinata API
        const pinataHeaders = {
            ...formData.getHeaders(),
        };

        if (process.env.PINATA_JWT) {
            pinataHeaders['Authorization'] = `Bearer ${process.env.PINATA_JWT}`;
        } else {
            pinataHeaders['pinata_api_key'] = process.env.PINATA_API_KEY;
            pinataHeaders['pinata_secret_api_key'] = process.env.PINATA_SECRET_API_KEY;
        }

        const pinataResponse = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            { headers: pinataHeaders }
        );

        const fileUrl = `https://gateway.pinata.cloud/ipfs/${pinataResponse.data.IpfsHash}`;
        console.log('Uploaded to Pinata:', fileUrl);

        // ✅ Cleanup: Delete temporary file after upload
        fs.unlinkSync(req.file.path);

        res.status(200).json({ imageUrl: fileUrl });
    } catch (error) {
        console.error('Pinata Upload Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to upload to Pinata', 
            details: error.response?.data || error.message 
        });
    }
});

// ✅ Ensure `/uploads/` directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Create an Event and Store Image URL in Firebase
app.post('/api/attendance/events', async (req, res) => {
    try {
        const { eventName, organizer, date, fileURL } = req.body;

        if (!eventName || !organizer || !date || !fileURL) {
            console.error('Missing fields in request');
            return res.status(400).json({ message: 'Missing required fields: eventName, organizer, date, fileURL' });
        }

        const eventRef = db.ref('events').push();
        await eventRef.set({ eventName, organizer, date, fileURL });

        console.log('Event created successfully:', { id: eventRef.key, eventName, organizer, date, fileURL });
        res.status(201).json({ id: eventRef.key, message: 'Event created successfully!' });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Get All Events
app.get('/api/attendance/events', async (req, res) => {
    try {
        const eventsRef = db.ref('events');
        const snapshot = await eventsRef.once('value');
        const eventsData = snapshot.val();

        if (!eventsData) {
            return res.status(404).json({ message: 'No events found' });
        }

        const formattedEvents = Object.keys(eventsData).map((key) => ({
            id: key,
            ...eventsData[key],
        }));

        console.log('Fetched Events:', formattedEvents);
        res.status(200).json(formattedEvents);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// Default Route
app.get('/', (req, res) => {
    res.send('Backend is connected to Firebase and Pinata!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
