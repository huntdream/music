import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import useUserAgent from '../hooks/useUserAgent';

const useSongUrl = (id?: number | string): [string] => {
  const { isSafari } = useUserAgent();
  const level: string = isSafari ? 'exhigh' : 'lossless';

  const { data } = useSWR(
    id ? `/song/url/v1?id=${id}&level=${level}` : null,
    (url) =>
      fetcher(url).then((res) => {
        return res.data?.[0].url;
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return [data?.replace(/http:/, 'https:')];
};

export default useSongUrl;
