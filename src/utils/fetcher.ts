import axios from 'axios';
import toast from 'react-hot-toast';

const fetcher = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://netease.maoyu.space/api'
      : 'http://localhost:3000',
  withCredentials: true,
});

fetcher.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const data = error?.response?.data;
    if (data?.message) {
      toast.error(data.message);
    }

    return Promise.reject(data);
  }
);

export default fetcher;
