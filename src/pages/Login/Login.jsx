import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Import Firebase authentication
import styles from './Login.module.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import L1 from '../../assets/L1.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login Successful');
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Login Error:', error.message);
      setErrorMessage(error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.background}>
      <Navbar2 />
      <div className={styles.mainContainer}>
        {/* Left Content */}
        <div className={styles.contentContainer}>
          <h1 className={styles.heading}>
            Welcome to <span className={styles.gradientText}>POAPify!</span>
          </h1>
          <p className={styles.subheading}>Login to your Account</p>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <input
              type="password"
              className={styles.inputField}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
          <button className={styles.loginButton} onClick={handleLogin}>
            LOG IN
          </button>
          <p className={styles.registerText}>
            Don't have an account?{' '}
            <Link to="/register" className={styles.gradientLink}>
              Register
            </Link>
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img src={L1} alt="Login Illustration" className={styles.rightImage} />
        </div>
      </div>
    </div>
  );
};

export default Login;
