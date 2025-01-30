import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase authentication method
import { auth } from '../../firebase'; // Import Firebase auth configuration
import styles from './Register.module.css';
import Navbar2 from '../../components/Navbar2/Navbar2';
import R1 from '../../assets/R1.png';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const { email, password, confirmPassword, termsAccepted } = formData;

    // Validate form
    if (!termsAccepted) {
      setError('You must accept the terms & conditions.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(''); // Clear previous errors

    try {
      // Firebase create user method
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Account created successfully! Please log in.');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
      });
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
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
          <p className={styles.subheading}>Create your Account</p>
          {error && <p className={styles.errorText}>{error}</p>}
          {successMessage && <p className={styles.successText}>{successMessage}</p>}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Enter your full name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Enter your email address"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Enter your password"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="Confirm your password"
            />
          </div>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              id="terms"
              className={styles.checkbox}
            />
            <label htmlFor="terms" className={styles.checkboxLabel}>
              I agree to terms & conditions
            </label>
          </div>
          <button className={styles.createAccountButton} onClick={handleSubmit}>
            CREATE AN ACCOUNT
          </button>
          <p className={styles.signInText}>
            Already have an account?{' '}
            <Link to="/login" className={styles.gradientLink}>
              Sign In
            </Link>
          </p>
        </div>

        <div className={styles.imageContainer}>
          <img src={R1} alt="R1" className={styles.rightImage} />
        </div>
      </div>
    </div>
  );
};

export default Register;
