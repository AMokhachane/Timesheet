import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCSS from './Login.module.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:5282/api/account/login', {
        username: username.toLowerCase(), // backend expects username lowercase
        password: password
      });

      console.log('Login successful:', response.data);

      localStorage.setItem('token', response.data.token);

      navigate('/');

    } catch (err) {
      console.error('Login failed:', err);

      if (err.response?.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className={LoginCSS['container']}>
      <div className={LoginCSS['left-panel']}>
        <h2>Welcome back to SmartLog</h2>
        <p>Don't have an account yet? Register now to start tracking your time and managing clients effortlessly.</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
      <div className={LoginCSS['right-panel']}>
        <form onSubmit={handleLogin} className={LoginCSS['login-form']}>
          <h2>Sign in</h2>
          {error && <div className={LoginCSS['error']}>{error}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
