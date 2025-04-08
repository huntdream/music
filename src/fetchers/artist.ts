import { ArtistAlbums, ArtistDetail, ArtistSongs } from '@/types/artist';
import useSWR from 'swr';

export const useArtistDetail = (id?: number | string) => {
  const { data } = useSWR<{ data: ArtistDetail }>(
    id ? `/artist/detail?id=${id}` : null
  );

  return data?.data;
};

export const useArtistSongs = (id?: number | string) => {
  const { data } = useSWR<ArtistSongs>(id ? `/artists?id=${id}` : null);

  return data?.hotSongs || [];
};
export const useArtistAlbums = (id?: number | string) => {
  const { data } = useSWR<ArtistAlbums>(id ? `/artist/album?id=${id}` : null);

  return data?.hotAlbums || [];
};
