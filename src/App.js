import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Events from './pages/Events/Events';
import Host from './pages/Host/Host';
import Attendance from './pages/Attendance/Attendance';
import Mint from "./pages/Mint";
import axiosInstance from './axiosInstance'; // Import Axios instance

function App() {
  // Example of a global API call if needed in App.js
  React.useEffect(() => {
    axiosInstance
      .get('/message')
      .then((response) => {
        console.log('Message from Backend:', response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching message:', error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/host" element={<Host />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/mint/:eventId" element={<Mint />} />
      </Routes>
    </Router>
  );
}

export default App;
