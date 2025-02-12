import Image from '@/components/Image';
import Controls from '@/components/Player/Controls';
import Progress from '@/components/Player/Progress';
import usePlayer from '@/components/Player/usePlayer';
import { ISong } from '@/types/song';
import React from 'react';

interface Props {}

const Playing: React.FC<Props> = () => {
  const { playingSong, prev, next, play } = usePlayer();

  if (!playingSong) return null;

  const { name, al } = playingSong;

  return (
    <div className='w-full h-full bg-white/80 backdrop-blur-md '>
      <div className='h-full flex flex-col items-center pt-16 mx-auto'>
        <Image src={al.picUrl} alt={name} className='h-auto rounded-lg w-72' />
        <div className='my-8'>
          <Controls />
        </div>
        <div className='w-80'>
          <Progress />
        </div>
      </div>
    </div>
  );
};

export default Playing;
