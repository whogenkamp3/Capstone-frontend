import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });

      // Assuming response.data contains user data including user_id
      const user_id = response.data.id;
      localStorage.setItem('user_id', user_id);

      const { access, refresh } = response.data;

      // Store the tokens in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Redirect to home page
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the register page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <br />
      <button onClick={handleRegisterRedirect}>Register</button>
    </div>
  );
};

export default Login;

