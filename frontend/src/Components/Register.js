import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCSS from './Register.module.css';
import axios from 'axios';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5282/api/account/register', {
        username: fullName,
        email: email,
        password: password
      });

      console.log('Registration successful:', response.data);

      // Optional: store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Clear form and redirect
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);

      if (err.response?.data?.errors) {
        // ASP.NET Identity error format (model state)
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join(' ');
        setError(errorMessages);
      } else if (err.response?.data?.title) {
        setError(err.response.data.title);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className={RegisterCSS['register-wrapper']}>
      <div className={RegisterCSS['left-panel']}>
        <h2>Welcome to SmartLog</h2>
        <p>Already have an account? Please log in to continue managing your time and clients efficiently.</p>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
      
      <div className={RegisterCSS['right-panel']}>
        <form onSubmit={handleRegister} className={RegisterCSS['register-form']}>
          <h2>Create Account</h2>
          {error && <div className={RegisterCSS['error']}>{error}</div>}
          <input
            type="text"
            placeholder="Fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p className={RegisterCSS['social-login-text']}>or use your account</p>
          <div className={RegisterCSS['social-icons']}>
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-linkedin-in"></i>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
