import { FC, useEffect, useMemo, useState } from 'react';
import { msToMinutes } from '../../utils/msConvert';
import usePlayer from './usePlayer';
import { Slider } from '../ui/slider';

interface Props {
  duration?: number;
}

const Progress: FC<Props> = ({ duration = 0 }) => {
  const { audioRef } = usePlayer();
  const totalTime = useMemo(() => msToMinutes(duration), [duration]);
  const [currentTime, setCurrentTime] = useState(0);

  const playedTime = msToMinutes(currentTime);

  const percent = (currentTime / duration) * 100;

  useEffect(() => {
    const handleTimeUpdate = () => {
      const current = audioRef.current?.currentTime || 0;

      setCurrentTime(current * 1000);
    };

    audioRef.current?.addEventListener('timeupdate', handleTimeUpdate);

    return () =>
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
  }, [audioRef]);

  const handleSeekTime = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (duration * value[0]) / 100000;
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='text-sm text-secondary-foreground min-w-10 text-right'>
        {playedTime}
      </div>
      <Slider
        className='mx-4'
        max={100}
        value={[percent]}
        onClick={(e) => e.stopPropagation()}
        onValueChange={handleSeekTime}
        step={0.01}
      />
      <div className='text-sm text-secondary-foreground min-w-10'>
        {totalTime}
      </div>
    </div>
  );
};

export default Progress;
