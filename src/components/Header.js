import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  const handleLogout = () => {
    // Remove tokens and user ID from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="App-header">
      <div className="header-left">
        <img src="/logo.jpeg" alt="Logo" className="logo" />
        <h1 className="app-title">Test Now</h1>
      </div>

      <div className="header-middle">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
        />
      </div>

      <div className="header-right">
        <div className="user-dropdown">
          <img
            src="/user.jpg" // Replace with a user icon path
            alt="User Icon"
            className="user-icon"
          />
          <div className="dropdown-content">
            <button onClick={handleProfileClick}>User Profile</button>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

