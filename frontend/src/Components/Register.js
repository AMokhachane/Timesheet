import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCSS from './Register.module.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Simulate successful registration
    console.log('User Registered:', {
      fullName,
      email,
      password,
    });

    // Clear form and redirect
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    navigate('/login');
  };

  return (
    <div className={RegisterCSS['register-container']}>
      <div className={RegisterCSS['wrapper']}>
        <div className={RegisterCSS['form-container']}>
          <form onSubmit={handleRegister} className={RegisterCSS['register-form']}>
            <h1>Register Profile</h1>
            {error && <div className={RegisterCSS['error']}>{error}</div>}
            <div className={RegisterCSS['form-group']}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className={RegisterCSS['form-group']}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={RegisterCSS['form-group']}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={RegisterCSS['form-group']}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={RegisterCSS['register-btn']}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;