import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Events.module.css';
import Navbar3 from '../../components/Navbar3/Navbar3';

const Events = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/attendance/events'); // Match backend port
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data); // Update state with events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

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
            <Link to="/dashboard" className={`${styles.navButton} ${styles.active}`}>
              Dashboard
            </Link>
            <Link to="/events" className={styles.navButton}>
              Events
            </Link>
            <Link to="/attendance" className={styles.navButton}>
              Attendance
            </Link>
          </div>
          <p className={styles.recentEventsText}>My Events</p>

          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className={styles.eventSection}>
                <div className={styles.eventDetails}>
                  <h1 className={styles.eventTitle}>{event.eventName}</h1>
                  <p className={styles.eventLocation}>{event.organizer}</p>
                  <p className={styles.eventDate}>{event.date}</p>
                </div>
                <div className={styles.qrContainer}>
                  <div className={styles.qrCard}>
                  <a href={`http://localhost:3000/mint/${event.id}`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`http://localhost:3000/mint/${event.id}`)}&size=360x360`}alt="QR Code"className={styles.qrPlaceholder}
                    />
                  </a>
                  </div>
                  <p className={styles.qrText}>Scan this code to prove your attendance</p>
                </div>
              </div>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
