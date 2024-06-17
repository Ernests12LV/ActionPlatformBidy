import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your backend server URL
  timeout: 5000,
});

export default axiosInstance;
