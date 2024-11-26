import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Register from './components/Register';  // Import the Register component
import ProtectedRoute from './components/ProtectedRoute';

// Create a router with all the routes defined
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />, // Redirect root to login by default
  },
  {
    path: '/login',
    element: <Login />, // Public Login Page
  },
  {
    path: '/register',
    element: <Register />, // Public Register Page
  },
  {
    path: '/home',
    element: <ProtectedRoute element={<Home />} />, // Home Page (protected)
  },
  {
    path: '/user-profile',
    element: <ProtectedRoute element={<UserProfile />} />, // User Profile Page (protected)
  },
]);

export default router;




