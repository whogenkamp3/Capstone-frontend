import axios from 'axios';


// Create an Axios instance
const api = axios.create({
 baseURL: 'http://localhost:8000/api/',
});


// Add a request interceptor to add the Authorization header
api.interceptors.request.use(
 (config) => {
   const token = localStorage.getItem('access_token');
   if (token && !config.url.includes('register/')) {
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
   if (error.response.status === 401 && !originalRequest._retry) {
     originalRequest._retry = true;
     const refreshToken = localStorage.getItem('refresh_token');


     try {
       // Attempt to refresh the token using the refresh token
       const response = await axios.post('http://localhost:8000/api/token/refresh/', {
         refresh: refreshToken,
       });
       const newAccessToken = response.data.access;


       // Store the new access token and retry the original request
       localStorage.setItem('access_token', newAccessToken);
       originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
       return api(originalRequest);
     } catch (refreshError) {
       console.error('Refresh token failed:', refreshError);
       // Redirect to login if refresh fails
       window.location.href = '/login';
       return Promise.reject(refreshError);
     }
   }


   return Promise.reject(error);
 }
);


export default api;
