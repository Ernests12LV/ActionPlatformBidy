import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your backend server URL
  headers: {
    'Content-Type': 'application/json',
},
  timeout: 5000,
});

export default axiosInstance;
