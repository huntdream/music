import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { ISong } from '@/types/song';

const useSongDetail = (ids?: number | string): [ISong] => {
  const { data } = useSWR(
    ids ? `/song/detail?ids=${ids}` : null,
    (url) =>
      fetcher(url).then((res: any) => {
        return res.songs?.[0];
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return [data];
};

export default useSongDetail;
