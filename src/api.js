import axios from 'axios';

// Create an Axios instance with the correct base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Make sure to use the correct backend URL and port
});

// Add a request interceptor to add the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the response status is 401 (Unauthorized), attempt to refresh the token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      
      // Check if the refresh token exists
      if (!refreshToken) {
        console.error('No refresh token found, redirecting to login.');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Attempt to refresh the token using the refresh token
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        
        // If successful, update the access token in localStorage and retry the original request
        const newAccessToken = response.data.access;
        localStorage.setItem('access_token', newAccessToken);

        // Update Authorization header with new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the error and redirect to login
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // If the error is not a 401 (Unauthorized), reject the promise with the error
    return Promise.reject(error);
  }
);

export default api;


