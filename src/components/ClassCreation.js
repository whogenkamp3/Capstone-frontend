import React, { useState } from 'react';
import api from '../api'; // Ensure the base URL in api.js points to your backend server
import './ClassCreation.css';
import { useNavigate } from 'react-router-dom';


const ClassCreation = () => {
  const [class_name, setClassName] = useState(''); // Updated to use class_name for consistency
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleClassSubmit = async () => {
    if (class_name.trim() === '') {
      setError('Class name cannot be empty.');
      setSuccessMessage(null);
      return;
    }
  
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        setError('User ID is missing.');
        setLoading(false);
        return;
      }
      console.log(user_id, class_name);
  
      // POST request to create the class with user_id as a query parameter
      const response = await api.post('/create-class-and-link/', 
        { class_name }, // Request body
        { params: { user_id } } // Query parameters
      );
  
      setSuccessMessage(`Class "${class_name}" created successfully!`);
      setClassName(''); // Clear the input field

      
      setTimeout(() => {
        navigate('/home');
      }, 2000); 

    } catch (err) {
      console.error('Error creating class:', err);
      setError(err.response?.data?.error || 'Failed to create class. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="class-creation-container">
      <div className="class-creation-header">
        <h2>Create a New Class</h2>
      </div>
      <div className="class-creation-content">
        <label htmlFor="class-name" className="class-label">Class Name:</label>
        <input
          type="text"
          id="class-name"
          value={class_name} // Updated to match variable name
          onChange={(e) => setClassName(e.target.value)} // Ensure correct state is updated
          placeholder="Enter class name"
          className="class-input"
        />
        <button
          onClick={handleClassSubmit}
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Class'}
        </button>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </div>
    </div>
  );
};

export default ClassCreation;



