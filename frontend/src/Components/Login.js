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

    if (email === 'admin@example.com' && password === 'password123') {
      console.log('Logged in successfully');
      navigate('/');
    } else {
      setError('Invalid email or password');
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
           {/* Forgot Password Link */}
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
