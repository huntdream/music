import useSWR from 'swr';
import { IPlaylist } from '../types/playlist';

const usePlaylist = (id?: number | string) => {
  const { data, error } = useSWR(id ? `/playlist/detail?id=${id}` : null);

  return { data: data?.playlist, error };
};

export default usePlaylist;
