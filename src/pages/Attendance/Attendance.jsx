import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation for navigation and active state
import styles from './Attendance.module.css';
import Navbar3 from '../../components/Navbar3/Navbar3';

const Attendance = () => {
  const location = useLocation(); // Get the current path

  return (
    <div className={styles.background}>
      <Navbar3 />
      <div className={styles.mainContainer}>
        {/* Left Content */}
        <div className={styles.contentContainer}>
          <h1 className={styles.heading}>
            <span className={styles.lightText}>Welcome</span>{' '}
            <span className={styles.gradientText}>Marc!</span>
          </h1>
          <div className={styles.navButtons}>
            <Link
              to="/dashboard"
              className={`${styles.navButton} ${
                location.pathname === '/dashboard' ? styles.active : ''
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/host"
              className={`${styles.navButton} ${
                location.pathname === '/host' ? styles.active : ''
              }`}
            >
              Events
            </Link>
            <Link
              to="/attendance"
              className={`${styles.navButton} ${
                location.pathname === '/attendance' ? styles.active : ''
              }`}
            >
              Attendance
            </Link>
          </div>
          <p className={styles.recentEventsText}>My Attendance</p>
          <div className={styles.cardsContainer}>
            <Link to="/events" className={styles.card}></Link>
            <Link to="/events" className={styles.card}></Link>
            <Link to="/events" className={styles.card}></Link>
            <Link to="/events" className={styles.card}></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
