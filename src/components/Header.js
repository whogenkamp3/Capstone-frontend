import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/user-profile'); // Navigate to the user profile page
  };

  const handleLogout = () => {
    // Remove tokens and user ID from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');

    // Redirect to login page
    navigate('/login');
  };

  const handleLogoClick = () => {
    // Navigate to home page when the logo is clicked
    navigate('/home');
  };

  return (
    <header className="App-header">
      <div className="header-left">
        {/* Logo now routes to /home */}
        <img 
          src="/logo.jpeg" 
          alt="Logo" 
          className="logo" 
          onClick={handleLogoClick} 
        />
        <h1 className="app-title">TestNow</h1>
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


