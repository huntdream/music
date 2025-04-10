import useSWR from 'swr';
import { ILyric } from '../types/song';
import fetcher from '../utils/fetcher';

export const useLyric = (id?: number | string) => {
  const { data } = useSWR(
    id ? `/lyric/new?id=${id}` : null,
    (url) => fetcher<any, ILyric>(url),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return [data];
};
