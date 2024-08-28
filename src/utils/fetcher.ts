import axios from 'axios';

const fetcher = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://netease.maoyu.space'
      : 'http://localhost:3000',
  withCredentials: true,
});

fetcher.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error?.response?.data);
  }
);

export default fetcher;
