const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.database();

// Middleware to Verify Token (If needed, uncomment to add token verification)
// const verifyToken = require('../middleware/verifyToken');

// Helper Function to Format Timestamp
const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Converts timestamp to a human-readable format
};

// Create an Event
router.post('/events', async (req, res) => {
    try {
      const { eventName, organizer, date, fileURL } = req.body;
  
      if (!eventName || !organizer || !date || !fileURL) {
        console.error('Validation failed:', { eventName, organizer, date, fileURL });
        return res.status(400).send({ error: 'Missing required fields: eventName, organizer, date, fileURL' });
      }
  
      const eventRef = db.ref('events').push();
      await eventRef.set({ eventName, organizer, date, fileURL });
  
      console.log('Event created successfully:', { id: eventRef.key, eventName, organizer, date, fileURL });
      res.status(201).send({ id: eventRef.key, message: 'Event created successfully!' });
    } catch (error) {
      console.error('Error creating event:', error.message, error.stack);
      res.status(500).send({ error: 'Failed to create event' });
    }
  });

// Mark Attendance
router.post('/mark-attendance', async (req, res) => {
    try {
        const { eventId, userAddress } = req.body;

        // Check for missing fields
        if (!eventId || !userAddress) {
            return res.status(400).send({ error: 'Missing required fields: eventId, userAddress' });
        }

        const attendeeRef = db.ref(`events/${eventId}/attendees/${userAddress}`);
        await attendeeRef.set({ timestamp: Date.now() });
        res.status(200).send({ message: 'Attendance marked successfully!' });
    } catch (error) {
        console.error('Mark Attendance Error:', error);
        res.status(500).send({ error: 'Failed to mark attendance' });
    }
});

// View Attendees
router.get('/attendees/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Check if eventId is provided
        if (!eventId) {
            return res.status(400).send({ error: 'Missing required field: eventId' });
        }

        const attendeesRef = db.ref(`events/${eventId}/attendees`);
        const snapshot = await attendeesRef.once('value');
        const attendeesData = snapshot.val();

        if (!attendeesData) {
            return res.status(404).send({ message: 'No attendees found for this event' });
        }

        // Format attendees with human-readable timestamps
        const attendees = Object.keys(attendeesData).map((address) => ({
            userAddress: address,
            timestamp: formatTimestamp(attendeesData[address].timestamp),
        }));

        res.status(200).send(attendees);
    } catch (error) {
        console.error('View Attendees Error:', error);
        res.status(500).send({ error: 'Failed to fetch attendees' });
    }
});

// Get All Events
router.get('/events', async (req, res) => {
    try {
        const eventsRef = db.ref('events');
        const snapshot = await eventsRef.once('value');
        const events = snapshot.val();

        if (!events) {
            return res.status(404).send({ message: 'No events found' });
        }

        // Format events with their unique IDs
        const formattedEvents = Object.keys(events).map((key) => ({
            id: key,
            ...events[key],
        }));

        res.status(200).send(formattedEvents);
    } catch (error) {
        console.error('Fetch Events Error:', error);
        res.status(500).send({ error: 'Failed to fetch events' });
    }
});

// Delete an Event
router.delete('/delete-event/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const eventRef = db.ref(`events/${eventId}`);
        const snapshot = await eventRef.once('value');

        if (!snapshot.exists()) {
            return res.status(404).send({ message: 'Event not found' });
        }

        await eventRef.remove();
        res.status(200).send({ message: 'Event deleted successfully!' });
    } catch (error) {
        console.error('Delete Event Error:', error);
        res.status(500).send({ error: 'Failed to delete event' });
    }
});

// Update an Event
router.put('/update-event/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const { eventName, organizer, date} = req.body;

        if (!eventName && !organizer && !date) {
            return res.status(400).send({ error: 'At least one field is required to update' });
        }

        const eventRef = db.ref(`events/${eventId}`);
        const snapshot = await eventRef.once('value');

        if (!snapshot.exists()) {
            return res.status(404).send({ message: 'Event not found' });
        }

        await eventRef.update({ eventName, organizer, date});
        res.status(200).send({ message: 'Event updated successfully!' });
    } catch (error) {
        console.error('Update Event Error:', error);
        res.status(500).send({ error: 'Failed to update event' });
    }
});

module.exports = router;