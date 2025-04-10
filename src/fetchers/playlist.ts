import useSWR from 'swr';
import { IPlaylist, IPlaylistsItem } from '../types/playlist';
import fetcher from '@/utils/fetcher';

export const usePlaylist = (
  id?: number | string
): { data: IPlaylist; error: any } => {
  const { data, error } = useSWR(id ? `/playlist/detail?id=${id}` : null);

  return { data: data?.playlist, error };
};

type Playlists = [IPlaylistsItem[], IPlaylistsItem[]];

export const usePlaylists = (uid?: number) => {
  const { data = [] } = useSWR<Playlists>(
    uid ? `/user/playlist?uid=${uid}` : null,
    (url: string): Promise<Playlists> =>
      fetcher(url).then((res: any) => {
        const created: IPlaylistsItem[] = [];
        const subscribed: IPlaylistsItem[] = [];
        if (res.code === 200) {
          res.playlist.forEach((item: IPlaylistsItem) => {
            if (item.userId === uid) {
              created.push(item);
            } else {
              subscribed.push(item);
            }
          });
        }
        return [created, subscribed];
      })
  );

  return data;
};
