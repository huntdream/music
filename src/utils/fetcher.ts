import axios from 'axios';
import { toast } from 'sonner';

const hostname = window.location.hostname;

const fetcher = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://music.maoyu.space/api'
      : `http://${hostname}:4000`,
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
