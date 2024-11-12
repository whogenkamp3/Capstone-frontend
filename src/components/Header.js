import React from 'react';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="App-header">
      <div className="header-left">
        <Logo />
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
            src="/user.jpg" // Replace with your actual image path in the public folder
            className="user-icon"
          />
          <div className="dropdown-content">
            <a href="#">User Settings</a>
            <a href="#">User Profile</a>
            <a href="#">Log Out</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
