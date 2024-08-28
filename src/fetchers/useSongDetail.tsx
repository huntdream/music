import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { ITrack } from '../types/playlist';

const useSongDetail = (ids?: number | string): [ITrack] => {
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
