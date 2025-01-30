import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Host.module.css';
import Navbar3 from '../../components/Navbar3/Navbar3';

const Host = () => {
  const [eventName, setEventName] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!file) {
        setErrorMessage('Please upload an image file.');
        setLoading(false);
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10 MB limit
        setErrorMessage('File size exceeds 10 MB.');
        setLoading(false);
        return;
      }

      if (!file.type.startsWith('image/')) {
        setErrorMessage('Only image files are allowed.');
        setLoading(false);
        return;
      }

      // Upload image to backend (which uploads to Pinata)
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading file to Pinata...');
      const uploadResponse = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorDetails = await uploadResponse.json();
        console.error('Backend upload error:', errorDetails);
        throw new Error(errorDetails.error || 'Failed to upload image');
      }

      const uploadData = await uploadResponse.json();
      const fileURL = uploadData.imageUrl; // Get Pinata URL
      console.log('Uploaded to Pinata, file URL:', fileURL);

      // Send event data to backend
      console.log('Sending event data to backend...');
      const response = await fetch('http://localhost:5000/api/attendance/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName, organizer, date, fileURL }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Backend error:', errorDetails);
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      setSuccessMessage(`Event "${data.id}" created successfully!`);
      setErrorMessage('');
      setEventName('');
      setOrganizer('');
      setDate('');
      setFile(null);
    } catch (error) {
      console.error('Error creating event:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.background}>
      <Navbar3 />
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.heading}>
            <span className={styles.lightText}>Welcome</span>{' '}
            <span className={styles.gradientText}>Marc!</span>
          </h1>
          <div className={styles.navButtons}>
            <Link to="/dashboard" className={`${styles.navButton} ${location.pathname === '/dashboard' ? styles.active : ''}`}>
              Dashboard
            </Link>
            <Link to="/host" className={`${styles.navButton} ${location.pathname === '/host' ? styles.active : ''}`}>
              Events
            </Link>
            <Link to="/attendance" className={`${styles.navButton} ${location.pathname === '/attendance' ? styles.active : ''}`}>
              Attendance
            </Link>
          </div>

          <form onSubmit={handleSubmit} className={styles.hostForm}>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Event Name</label>
              <input 
                type="text" 
                className={styles.inputField} 
                placeholder="Enter event name" 
                value={eventName} 
                onChange={(e) => setEventName(e.target.value)} 
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Organization</label>
              <input 
                type="text" 
                className={styles.inputField} 
                placeholder="Enter organization name" 
                value={organizer} 
                onChange={(e) => setOrganizer(e.target.value)} 
                required
              />
            </div>
            <div className={styles.dateGroup}>
              <label className={styles.inputLabel}>Event Date</label>
              <input 
                type="date" 
                className={styles.dateInput} 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Upload NFT (.png)</label>
              <input 
                type="file" 
                className={styles.inputField} 
                accept="image/png" 
                onChange={(e) => setFile(e.target.files[0])} 
                required
              />
            </div>
            <button type="submit" className={styles.generateButton} disabled={loading}>
              {loading ? 'Uploading...' : 'CREATE EVENT'}
            </button>
          </form>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Host;
