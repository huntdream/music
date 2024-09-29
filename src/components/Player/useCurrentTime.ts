import { useEffect, useRef, useState } from 'react';
import usePlayer from './usePlayer';

const useCurrentTime = () => {
  const { audioRef } = usePlayer();
  const [currentTime, setCurrentTime] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current?.seek());

        raf.current = requestAnimationFrame(handleTimeUpdate);
      }
    };

    requestAnimationFrame(handleTimeUpdate);

    return () => cancelAnimationFrame(raf.current);
  }, [audioRef.current]);

  return currentTime;
};

export default useCurrentTime;
