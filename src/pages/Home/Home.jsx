import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import LP1 from '../../assets/LP1.png';
import LP2 from '../../assets/LP2.png';

const Home = () => {
  const navigate = useNavigate();

  const LearnMore = () => {
    navigate('/about'); // Redirect to About page
  };

  const GetStarted = () => {
    navigate('/register'); // Redirect to Register page
  };

  return (
    <div className={styles.background}>
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.heading}>
            Revolutionize Event<br />
            Attendance
          </h1>
          <p className={styles.subheading}>
            Secure, tamper-proof, and verifiable attendance for physical and virtual events.
          </p>
          <button onClick={LearnMore} className={styles.learnMoreButton}>
            LEARN MORE
          </button>
        </div>
        <div className={styles.imageContainer}>
          <img src={LP1} alt="LP1" className={styles.image} />
        </div>
      </div>

      <div className={styles.howItWorksContainer}>
        <h2 className={styles.howItWorksHeading}>
          How it <span className={styles.gradientTextWorks}>Works?</span>
        </h2>
        <div className={styles.howItWorksContent}>
          <img src={LP2} alt="LP2" className={styles.howItWorksImage} />
          <div className={styles.stepsContainer}>
            <p className={styles.stepText}>
              <span className={styles.gradientTextNumber}>01.</span><br />Create or Join an Event
            </p>
            <p className={styles.stepText}>
              <span className={styles.gradientTextNumber}>02.</span><br />Verify Attendance
            </p>
            <p className={styles.stepText}>
              <span className={styles.gradientTextNumber}>03.</span><br />Receive Unique Token
            </p>
            <p className={styles.stepText}>
              <span className={styles.gradientTextNumber}>04.</span><br />Manage your Token
            </p>
          </div>
        </div>
        <button onClick={GetStarted} className={styles.getStartedButton}>
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default Home;
