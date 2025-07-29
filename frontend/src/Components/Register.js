import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCSS from './Register.module.css';
import axios from 'axios';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User'); // Default role
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

    // At least one number
    if (!/\d/.test(password)) {
      setError('Password must contain at least one number');
      return;
    }

    // At least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError('Password must contain at least one special character');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/account/register`,
        {
          username: fullName,
          email: email,
          password: password,
          role: role,  // <-- Send selected role here
        }
      );

      console.log('Registration successful:', response.data);

      // Optional: store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Clear form and redirect
      setFullName('');
      setEmail('');
      setRole('User');  // reset to default role
      setPassword('');
      setConfirmPassword('');
      setError(null);
      navigate('/');
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
        <p>
          Already have an account? Please log in to continue managing your time and clients
          efficiently.
        </p>
        <button onClick={() => navigate('/')}>Login</button>
      </div>

      <div className={RegisterCSS['right-panel']}>
        <form onSubmit={handleRegister} className={RegisterCSS['register-form']}>
          <h2>Create Account</h2>
          {error && <div className={RegisterCSS['error']}>{error}</div>}

          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              id="fullname"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Supervisor">Supervisor</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

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
