import React from 'react';
import useSWR from 'swr';
import useUser from '../../context/App/useUser';
import { IRecommendation, ITrack } from '../../types/playlist';
import Song from '../../components/Song';
import usePlayer from '../../components/Player/usePlayer';
import Auth from '../../components/Auth';
import { Button } from '@/components/ui/button';

interface Props {}

const Daily: React.FC<Props> = () => {
  const { play, replaceQueue, appendQueue, setPlayingSong, queue } =
    usePlayer();
  const [user] = useUser();

  const { data, isLoading } = useSWR<IRecommendation>(
    user?.userId ? '/recommend/songs' : ''
  );

  const handlePlay = (song?: ITrack) => {
    if (data?.data) {
      replaceQueue(data?.data.dailySongs);

      if (song) {
        setPlayingSong(song);
      }
    }
  };

  const handleAdd = () => {
    if (data?.data) {
      if (!queue.length) {
        setPlayingSong(data.data.dailySongs[0]);
      }

      appendQueue(data?.data.dailySongs);
    }
  };

  if (!user?.userId) {
    return <Auth page />;
  }

  return (
    <div className='pb-36'>
      <div className='p-4'>
        <div>
          <div className='w-36 h-36 rounded-md bg-linear-to-r from-teal-400 to-blue-500 flex items-center justify-center'>
            <span className='text-2xl font-extrabold text-white'>每日推荐</span>
          </div>
        </div>
        <div className='flex gap-2 mt-4'>
          <Button onClick={() => handlePlay()}>播放</Button>

          <Button onClick={handleAdd} variant='secondary'>
            加入播放列表
          </Button>
        </div>
      </div>
      <div className='px-2 mt-4'>
        {data?.data.dailySongs.map((song) => (
          <Song song={song} duration key={song.id} onPlay={handlePlay} />
        ))}
      </div>
    </div>
  );
};

export default Daily;
