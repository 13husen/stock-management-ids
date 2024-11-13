import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Adjust base URL to your backend server
});

export default api;