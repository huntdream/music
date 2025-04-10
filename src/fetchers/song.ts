import useUserAgent from '@/hooks/useUserAgent';
import { ISong } from '@/types/song';
import fetcher from '@/utils/fetcher';
import { toast } from 'sonner';
import useSWR from 'swr';

export const checkMusic = async (id: number) => {
  const res = await fetcher<null, { success: boolean; message: string }>(
    `/check/music?id=${id}`
  );
  if (res.success) {
    return true;
  }

  return res.message;
};

export const getSongUrl = async (id: number, level?: string) => {
  const check = await checkMusic(id);
  if (check !== true) {
    toast.info(check);
    return false;
  }

  const { isSafari } = useUserAgent();
  const lv: string = isSafari ? 'exhigh' : level || 'lossless';

  const res = await fetcher(`/song/url/v1?id=${id}&level=${lv}`);
  const url = res.data?.[0].url.replace(/http:/, 'https:');
  return url;
};

export const useSongDetail = (ids?: number | string): [ISong] => {
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

export const useFirstListen = (id: number) => {
  const { data } = useSWR(id ? `/music/first/listen/info?id=${id}` : null);

  return [data];
};
