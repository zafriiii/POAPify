import React from 'react';
import styles from './About.module.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import AB1 from '../../assets/AB1.png';

const About = () => {
  return (
    <div className={styles.background}>
    <Navbar2 />  
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.heading}>About Us</h1>
          <p className={styles.paragraph}>
            Proof of Attendance Protocol is a blockchain-based system that ensures secure, tamper-proof verification of event attendance. It provides attendees with unique digital tokens as proof of their participation, revolutionizing the way we track and validate attendance.
          </p>
          <p className={styles.paragraph}>
            Our mission is to revolutionize event management by providing a secure, decentralized, and user-friendly attendance solution. We aim to build trust and efficiency in attendance systems across industries.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img src={AB1} alt="AB1" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default About;
