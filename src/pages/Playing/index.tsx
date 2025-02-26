import GradientOverlay from '@/components/GradientOverlay';
import Image from '@/components/Image';
import Lyric from '@/components/Lyric';
import Controls from '@/components/Player/Controls';
import Progress from '@/components/Player/Progress';
import usePlayer from '@/components/Player/usePlayer';
import { Button } from '@/components/ui/button';
import { ISong } from '@/types/song';
import { ArrowDownFromLine } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {}

const Playing: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { playingSong, prev, next, play } = usePlayer();

  if (!playingSong) return null;

  const { name, al } = playingSong;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='fixed z-40 inset-0 bg-white/80 backdrop-blur-md animate-slide-in'>
      <Button
        size='icon'
        variant='ghost'
        className='fixed left-4 top-4'
        onClick={handleBack}
      >
        <ArrowDownFromLine />
      </Button>
      <div className='flex h-full'>
        <div className='h-full flex-1 flex flex-col items-center justify-between pt-16 mx-auto'>
          <Image
            src={al.picUrl}
            alt={name}
            className='h-auto rounded-lg w-72'
          />
          <div className='mb-40'>
            <div className='my-8'>
              <Controls />
            </div>
            <div className='w-80'>
              <Progress />
            </div>
          </div>
        </div>
        <div className='flex-1 h-full relative'>
          <GradientOverlay className='h-[32%]' position='top' />
          <Lyric id={playingSong.id} />
          <GradientOverlay className='h-[32%]' />
        </div>
      </div>
    </div>
  );
};

export default Playing;
