import Artists from '@/components/Artist/Artists';
import GradientOverlay from '@/components/GradientOverlay';
import Image from '@/components/Image';
import Lyric from '@/components/Lyric';
import Controls from '@/components/Player/Controls';
import Progress from '@/components/Player/Progress';
import usePlayer from '@/components/Player/usePlayer';
import { Button } from '@/components/ui/button';
import { AppContext } from '@/context/App/App';
import { ISong } from '@/types/song';
import { ArrowDownFromLine } from 'lucide-react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {}

const Playing: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { playingSong } = usePlayer();
  const { isDesktop } = useContext(AppContext);
  if (!playingSong) return null;

  const { name, al } = playingSong;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='fixed z-40 inset-0 bg-background/80 backdrop-blur-md animate-slide-in'>
      <Button
        size='icon'
        variant='ghost'
        className='fixed left-4 top-4'
        onClick={handleBack}
      >
        <ArrowDownFromLine />
      </Button>
      <div className='flex h-full'>
        <div className='h-full flex-1 flex flex-col items-center pt-16 mx-auto'>
          <div className='w-72 h-72 overflow-hidden flex items-center justify-center'>
            <Image
              src={al.picUrl}
              alt={name}
              className='max-w-full max-h-full rounded-lg aspect-auto'
            />
          </div>

          <div className='mt-24 w-full'>
            <div className='text-center'>
              <div className='font-bold text-lg'>{playingSong.name}</div>
              <div>
                <Artists artists={playingSong.ar} />
              </div>
            </div>
            <div className='my-8 w-[70%] mx-auto'>
              <Progress />
            </div>
            <div className='mt-12'>
              <Controls />
            </div>
          </div>
        </div>
        {isDesktop && (
          <div className='flex-1 h-full relative'>
            <GradientOverlay className='h-[32%]' position='top' />
            <Lyric id={playingSong.id} />
            <GradientOverlay className='h-[32%]' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Playing;
