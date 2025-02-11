import React, { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import usePlayer from './usePlayer';
import { Volume2, VolumeX } from 'lucide-react';
import IconButton from '../IconButton';

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
      const savedVolume = parseFloat(localStorage.getItem('volume') || '1');

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

      <IconButton onClick={handleClick}>
        {muted ? <VolumeX /> : <Volume2 />}
      </IconButton>
    </div>
  );
};

export default Volume;
