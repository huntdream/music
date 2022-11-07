import useSWR from 'swr';
import { IPlaylistsItem } from '../types/playlist';
import fetcher from '../utils/fetcher';

const usePlaylists = (uid?: number) => {
  const { data = [] } = useSWR<[IPlaylistsItem[], IPlaylistsItem[]]>(
    uid ? `/user/playlist?uid=${uid}` : null,
    (url) =>
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

export default usePlaylists;
