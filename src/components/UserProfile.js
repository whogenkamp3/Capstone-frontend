import React, { useEffect, useState } from 'react';
import api from '../api';
import Header from './Header'; // Adjusted the import path
import './UserProfile.css';



const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        setError('User ID is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/user/${userId}/`);
        setUserData(response.data);
      } catch (err) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="user-profile-container">
      <Header /> {/* This is how the Header component is used */}
      <div className="user-profile-header">
        <h2>User Profile</h2>
      </div>
      <div className="user-profile-content">
        <p><strong>First Name:</strong> {userData.first_name}</p>
        <p><strong>Last Name:</strong> {userData.last_name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
