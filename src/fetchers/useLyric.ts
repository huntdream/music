import useSWR from 'swr';
import { ILyric } from '../types/song';
import fetcher from '../utils/fetcher';

const useLyric = (id?: number | string) => {
  const { data } = useSWR(
    id ? `/lyric?id=${id}` : null,
    (url) => fetcher<any, ILyric>(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return [data];
};

export default useLyric;
