import useSWR from 'swr';
import fetcher from '../utils/fetcher';

const useSongUrl = (id?: number | string): [string] => {
  const { data } = useSWR(
    id ? `/song/url/v1?id=${id}&level=standard` : null,
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
