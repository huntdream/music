import { FC, useEffect, useMemo, useRef, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { msToMinutes } from '../../utils/msConvert';
import usePlayer from './usePlayer';
import useCurrentTime from './useCurrentTime';

interface Props {
  duration?: number;
}

const Progress: FC<Props> = ({ duration = 0 }) => {
  const { audioRef } = usePlayer();
  const totalTime = useMemo(() => msToMinutes(duration), [duration]);
  const currentTime = useCurrentTime();
  const currentTimeInMs = currentTime * 1000;
  const playedTime = msToMinutes(currentTimeInMs);

  const percent = (currentTimeInMs / duration) * 100;

  const handleSeekTime = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current?.seek((duration * value[0]) / 100000);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='text-sm text-secondary min-w-10 text-right'>
        {playedTime}
      </div>
      <Slider.Root
        className='relative flex items-center select-none mx-4 touch-none flex-1 h-5'
        max={100}
        value={[percent]}
        onClick={(e) => e.stopPropagation()}
        onValueChange={handleSeekTime}
        step={0.01}
      >
        <Slider.Track className='bg-secondary relative grow rounded-full h-1'>
          <Slider.Range className='absolute bg-primary rounded-full h-full' />
        </Slider.Track>
        <Slider.Thumb className='block w-2 h-2 bg-secondary rounded-md hover:bg-purple-500 ' />
      </Slider.Root>
      <div className='text-sm text-secondary min-w-10'>{totalTime}</div>
    </div>
  );
};

export default Progress;
