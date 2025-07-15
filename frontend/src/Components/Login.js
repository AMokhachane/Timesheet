import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCSS from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login
    if (email === 'admin@example.com' && password === 'password123') {
      console.log('Logged in successfully');
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={LoginCSS['login-container']}>
      <div className={LoginCSS['wrapper']}>
        <form onSubmit={handleLogin} className={LoginCSS['login-form']}>
          <h1>Login</h1>
          {error && <div className={LoginCSS['error']}>{error}</div>}
          <div className={LoginCSS['form-group']}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={LoginCSS['form-group']}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={LoginCSS['login-btn']}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
