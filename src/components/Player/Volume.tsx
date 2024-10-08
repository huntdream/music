import React, { SyntheticEvent, useEffect, useState } from 'react';
import cls from 'classnames';
import * as Slider from '@radix-ui/react-slider';
import usePlayer from './usePlayer';
import { SpeakerXMarkIcon, SpeakerWaveIcon } from '@heroicons/react/24/solid';

interface Props {}

const Volume: React.FC<Props> = () => {
  const { audioRef } = usePlayer();

  const [volume, setVolume] = useState(audioRef.current?.volume || 0);
  const [muted, setMuted] = useState(false);

  const handleChange = ([value]: [number]) => {
    setVolume(value);
    const isMuted = value === 0 || false;
    setMuted(isMuted);
    audioRef.current!.muted = isMuted;
    audioRef.current!.volume = value;
    localStorage.setItem('volume', value.toString());
  };

  useEffect(() => {
    if (audioRef.current) {
      const savedVolume = parseFloat(localStorage.getItem('volume') || '0');

      setMuted(audioRef.current.muted);
      setVolume(savedVolume || audioRef.current.volume);
      audioRef.current.volume = savedVolume;
    }
  }, [audioRef]);

  const handleClick = () => {
    if (audioRef.current) {
      const isMuted = audioRef.current.muted;
      setVolume(isMuted ? audioRef.current.volume : 0);
      audioRef.current.muted = !isMuted;
      setMuted(!isMuted);
    }
  };

  return (
    <div className='flex items-center'>
      <Slider.Root
        className='relative flex items-center w-20 select-none mx-4 touch-none flex-1 h-5'
        max={1}
        value={[volume]}
        onClick={(e) => e.stopPropagation()}
        onValueChange={handleChange}
        step={0.01}
      >
        <Slider.Track className='bg-secondary relative cursor-pointer grow rounded-md h-1'>
          <Slider.Range className='absolute bg-primary rounded-full h-full' />
        </Slider.Track>
        <Slider.Thumb className='block w-2 h-2 bg-secondary cursor-grab rounded-md hover:bg-purple-500 ' />
      </Slider.Root>
      {muted ? (
        <SpeakerXMarkIcon
          className={cls(
            'w-6 h-6 cursor-pointer text-secondary hover:text-primary'
          )}
          onClick={handleClick}
        />
      ) : (
        <SpeakerWaveIcon
          className={cls(
            'w-6 h-6 cursor-pointer text-secondary hover:text-primary'
          )}
          onClick={handleClick}
        />
      )}
    </div>
  );
};

export default Volume;
