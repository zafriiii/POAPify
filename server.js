const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Backend API');
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Welcome to the Backend API' });
});

app.get('/api/events', (req, res) => {
  const eventsData = [
    { id: 1, name: 'Class Conference 2025', location: 'Multimedia University', date: '2025-12-12' },
    { id: 2, name: 'Tech Summit 2025', location: 'Cyberjaya Tech Park', date: '2025-05-20' },
    { id: 3, name: 'Hackathon 2025', location: 'Kuala Lumpur', date: '2025-03-15' },
  ];
  res.json(eventsData);
});

app.get('/api/attendance', (req, res) => {
  const attendanceData = [
    { eventName: 'Event 1', date: '2025-01-15', status: 'Present' },
    { eventName: 'Event 2', date: '2025-01-14', status: 'Absent' },
    { eventName: 'Event 3', date: '2025-01-13', status: 'Present' },
    { eventName: 'Event 4', date: '2025-01-12', status: 'Late' },
  ];
  res.json(attendanceData);
});

app.get('/api/about', (req, res) => {
  const aboutContent = {
    intro: 'Proof of Attendance Protocol is a blockchain-based system that ensures secure, tamper-proof verification of event attendance. It provides attendees with unique digital tokens as proof of their participation, revolutionizing the way we track and validate attendance.',
    mission: 'Our mission is to revolutionize event management by providing a secure, decentralized, and user-friendly attendance solution. We aim to build trust and efficiency in attendance systems across industries.',
  };
  res.json(aboutContent);
});

app.get('/api/how-it-works', (req, res) => {
  const steps = [
    'Create or Join an Event',
    'Verify Attendance',
    'Receive Unique Token',
    'Manage your Token',
  ];
  res.json({ steps });
});

app.get('/api/events/:eventId', (req, res) => {
  const { eventId } = req.params;

  const eventsData = [
    { id: "1", name: "Class Conference 2025", location: "Multimedia University", date: "2025-12-12" },
    { id: "2", name: "Tech Summit 2025", location: "Cyberjaya Tech Park", date: "2025-05-20" },
    { id: "3", name: "Hackathon 2025", location: "Kuala Lumpur", date: "2025-03-15" },
  ];

  // Convert IDs to strings for consistency
  const event = eventsData.find(e => e.id === eventId);
  
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.json(event);
});

app.post('/api/events', (req, res) => {
  const { eventName, organization, date } = req.body;
  console.log('New Event:', { eventName, organization, date });
  res.status(201).json({
    message: 'Event created successfully',
    event: { eventName, organization, date },
  });
});

app.post('/api/join', (req, res) => {
  const { eventLink } = req.body;
  console.log('Joined Event Link:', eventLink);
  res.status(200).json({ message: 'Joined event successfully', eventLink });
});

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const mockUser = {
    email: 'user@example.com',
    password: 'password123',
  };

  if (email === mockUser.email && password === mockUser.password) {
    res.status(200).json({
      message: 'Login successful',
      user: {
        email: mockUser.email,
        name: 'John Doe',
      },
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/api/register', (req, res) => {
  const { fullName, email, password } = req.body;
  console.log('New User:', { fullName, email });

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  res.status(201).json({ message: 'Account created successfully', fullName, email });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
