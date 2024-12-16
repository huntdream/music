import useUserAgent from '../hooks/useUserAgent';
import fetcher from '../utils/fetcher';

const getSongUrl = async (id: number, level?: string) => {
  const { isSafari } = useUserAgent();
  const lv: string = isSafari ? 'exhigh' : level || 'lossless';

  const res = await fetcher(`/song/url/v1?id=${id}&level=${lv}`);
  const url = res.data?.[0].url.replace(/http:/, 'https:');
  return url;
};

export default getSongUrl;
