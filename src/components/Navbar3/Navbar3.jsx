import React from 'react';
import styles from './Navbar3.module.css';
import logo from '../../assets/blogo.png'; // Adjust the path if necessary

const Navbar3 = ({ userName }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <span className={styles.brandText}>POAPify</span>
      </div>
      <div className={styles.rightSection}>
        <span className={styles.userName}>{userName ? `Welcome, ${userName}!` : 'Welcome!'}</span>
      </div>
    </nav>
  );
};

export default Navbar3;
