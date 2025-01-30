import axios from 'axios';

// Set the base URL of your backend API
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000, // Optional: Set a timeout for requests
});

// Example: Create Event
export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/attendance/create-event', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Example: Mark Attendance
export const markAttendance = async (attendanceData) => {
  try {
    const response = await api.post('/attendance/mark-attendance', attendanceData);
    return response.data;
  } catch (error) {
    console.error('Error marking attendance:', error);
    throw error;
  }
};

// Example: Get Attendees
export const getAttendees = async (eventId) => {
  try {
    const response = await api.get(`/attendance/attendees/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting attendees:', error);
    throw error;
  }
};

export default api;

