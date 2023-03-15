import axios from 'axios';

const fetcher = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://ncmusic.vercel.app'
      : 'https://ncmusic.vercel.app',
  withCredentials: true,
});

fetcher.interceptors.response.use((response) => {
  return response.data;
});

export default fetcher;
