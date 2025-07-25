import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCSS from './Login.module.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/account/login`,
        {
          email: email.trim(),  // send trimmed email
          password: password,
        }
      );

      console.log('Login successful:', response.data);

      localStorage.setItem('token', response.data.token);

      navigate('/dash');
    } catch (err) {
      console.error('Login failed:', err);

      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className={LoginCSS['container']}>
      <div className={LoginCSS['left-panel']}>
        <h2>Welcome back to SmartLog</h2>
        <p>
          Don't have an account yet? Register now to start tracking your time and managing clients effortlessly.
        </p>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
      <div className={LoginCSS['right-panel']}>
        <form onSubmit={handleLogin} className={LoginCSS['login-form']}>
          <h2>Sign in</h2>
          {error && <div className={LoginCSS['error']}>{error}</div>}
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
          <div className={LoginCSS['forgot-password']}>
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
