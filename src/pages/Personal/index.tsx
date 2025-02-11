import React, { useEffect } from 'react';
import { useUser } from '../../context/App';
import Auth from '@/components/Auth';
import useSWR from 'swr';
import { ISong } from '@/types/song';
import usePlayer from '@/components/Player/usePlayer';
import fetcher from '@/utils/fetcher';
import { IAlbum, IArtist } from '@/types/playlist';

interface Props {}

const Personal: React.FC<Props> = () => {
  const { replaceQueue } = usePlayer();
  const { data = [] } = useSWR<ISong[]>('/personal_fm', (url: string) =>
    fetcher(url).then((res) =>
      res.data.map(({ album, artists, duration, ...song }: ISong) => ({
        ...song,
        al: album,
        ar: artists,
        dt: duration,
      }))
    )
  );

  useEffect(() => {
    console.log(data);
    if (data.length) {
      replaceQueue(data);
    }
  }, [data]);

  return (
    <div className='px-2 pb-36 h-full'>
      <div>Work in progress</div>
      <Auth page />
    </div>
  );
};

export default Personal;
