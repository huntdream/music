import useSWR from 'swr';
import { IPlaylist } from '../types/playlist';

const usePlaylist = (id?: number | string): [IPlaylist] => {
  const { data } = useSWR(id ? `/playlist/detail?id=${id}` : null);

  return [data?.playlist];
};

export default usePlaylist;
