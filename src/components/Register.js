import React, { useState } from 'react';
import api from '../api'; // Assuming api.js is where Axios is configured
import { useNavigate } from 'react-router-dom';
import './Register.css';


const Register = () => {
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [university, setUniversity] = useState('');
 const [email, setEmail] = useState('');
 const [error, setError] = useState(null);
 const [success, setSuccess] = useState(false);
 const [loading, setLoading] = useState(false);  // New loading state
 const navigate = useNavigate();


 const handleRegister = async (e) => {
   e.preventDefault();


   // Validate input fields
   if (!firstName || !lastName || !username || !password || !confirmPassword || !university || !email) {
     setError('All fields are required.');
     return;
   }


   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     setError('Invalid email address.');
     return;
   }


   if (password !== confirmPassword) {
     setError('Passwords do not match.');
     return;
   }


   if (password.length < 8) {
     setError('Password must be at least 8 characters long.');
     return;
   }


   setLoading(true);  // Start loading before making the request


   try {
     // Register the user
     const registerResponse = await api.post('register/', {
       username,
       password,
       first_name: firstName,
       last_name: lastName,
       email,
       university,
     });


     if (registerResponse.status === 201) {
       setSuccess(true);
       setError(null);


       // Auto-login after registration
       const loginResponse = await api.post('login/', {
         username,
         password,
       });


       const { access, refresh } = loginResponse.data;


       // Store tokens locally
       localStorage.setItem('access_token', access);
       localStorage.setItem('refresh_token', refresh);


       // Redirect user to the dashboard after a short delay
       setTimeout(() => {
         navigate('/home');
       }, 2000);  // Give time for the success message to be displayed
     }
   } catch (err) {
     if (err.response) {
       setError(err.response.data.detail || 'An error occurred during registration.');
     } else {
       setError('An unexpected error occurred. Please try again.');
     }
   } finally {
     setLoading(false);  // Stop loading when the request finishes
   }
 };


 return (
   <div className="register-container">
     <h2>Register</h2>
     {success ? (
       <div className="success-message">Registration successful! Redirecting...</div>
     ) : (
       <form onSubmit={handleRegister} className="register-form">
         <label htmlFor="firstName">First Name:</label>
         <input
           type="text"
           id="firstName"
           value={firstName}
           onChange={(e) => setFirstName(e.target.value)}
         />


         <label htmlFor="lastName">Last Name:</label>
         <input
           type="text"
           id="lastName"
           value={lastName}
           onChange={(e) => setLastName(e.target.value)}
         />


         <label htmlFor="username">Username:</label>
         <input
           type="text"
           id="username"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
         />


         <label htmlFor="password">Password:</label>
         <input
           type="password"
           id="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />


         <label htmlFor="confirmPassword">Confirm Password:</label>
         <input
           type="password"
           id="confirmPassword"
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
         />


         <label htmlFor="university">University:</label>
         <input
           type="text"
           id="university"
           value={university}
           onChange={(e) => setUniversity(e.target.value)}
         />


         <label htmlFor="email">Email:</label>
         <input
           type="email"
           id="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
         />


         <button type="submit" className="register-button" disabled={loading}>
           {loading ? 'Registering...' : 'Register'}
         </button>
       </form>
     )}
     {error && <div className="error-message">{error}</div>}
   </div>
 );
};


export default Register;