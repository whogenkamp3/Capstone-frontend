import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import Register from './components/Register';  // Import the Register component
import Groups from './components/Groups'; // Import the Groups component
import ProtectedRoute from './components/ProtectedRoute';
import ClassCreation from './components/ClassCreation';
import AIWriting from './components/AIWriting';


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
 {
  path: '/groups',
  element: <ProtectedRoute element={<Groups />} />, // Groups Page (protected)
},
{
  path: '/classcreation',
  element: <ProtectedRoute element={<ClassCreation />} />,
 },
 {
  path: '/aiwriting',
  element: <ProtectedRoute element={<AIWriting />} />,
 },
]);


export default router;




