import axios from 'axios';

const fetcher = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

fetcher.interceptors.response.use((response) => {
  return response.data;
});

export default fetcher;
