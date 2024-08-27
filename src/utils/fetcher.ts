import axios from 'axios';

const fetcher = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://netease.maoyu.dev'
      : 'https://netease.maoyu.dev',
  withCredentials: true,
});

fetcher.interceptors.response.use((response) => {
  return response.data;
});

export default fetcher;
