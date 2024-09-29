import React from 'react';
import useSWR from 'swr';
import useUser from '../../context/App/useUser';
import { IRecommendation } from '../../types/playlist';
import Song from '../../components/Song';
import { PlayCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import usePlayer from '../../components/Player/usePlayer';

interface Props {}

const Daily: React.FC<Props> = () => {
  const { play, replaceQueue, appendQueue, setPlayingSong, queue } =
    usePlayer();
  const [user] = useUser();

  const { data, isLoading } = useSWR<IRecommendation>(
    user?.userId ? '/recommend/songs' : ''
  );

  const handlePlay = () => {
    if (data?.data) {
      replaceQueue(data?.data.dailySongs);
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

  return (
    <div>
      <div className='p-4'>
        <div>
          <div className='w-36 h-36 rounded-md bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center'>
            <span className='text-2xl font-extrabold text-white'>每日推荐</span>
          </div>
        </div>
        <div className='flex gap-2 mt-4'>
          <PlayCircleIcon
            onClick={handlePlay}
            className='w-10 h-10 cursor-pointer'
          />
          <PlusCircleIcon
            onClick={handleAdd}
            className='w-10 h-10 cursor-pointer'
          />
        </div>
      </div>
      <div className='px-2 mt-4'>
        {data?.data.dailySongs.map((song) => (
          <Song song={song} duration key={song.id} />
        ))}
      </div>
    </div>
  );
};

export default Daily;
