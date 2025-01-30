import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import styles from './Navbar2.module.css';
import logo from '../../assets/blogo.png'; // Path to the logo

const Navbar2 = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.brandText}>POAPify</span>
      </div>
      <div className={styles.rightSection}>
        <Link to="/" className={styles.navButton}>Home</Link>
        <Link to="/about" className={styles.navButton}>About</Link>
        <Link to="/register" className={styles.navButtonGradient}>Register</Link>
        <Link to="/login" className={styles.navButtonGradient}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar2;
