import { useState, useEffect } from 'react';
import { ISong } from '../types/song';

const usePlayerState = () => {
  const [queue, setQueue] = useState<ISong[]>(() => {
    const savedQueue = localStorage.getItem('queue');
    try {
      return savedQueue ? JSON.parse(savedQueue) : [];
    } catch {
      return [];
    }
  });

  const [playingSong, setPlayingSong] = useState<ISong>(() => {
    const savedSong = localStorage.getItem('playingSong');
    try {
      return savedSong ? JSON.parse(savedSong) : undefined;
    } catch {
      return undefined;
    }
  });

  useEffect(() => {
    localStorage.setItem('queue', JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    localStorage.setItem('playingSong', JSON.stringify(playingSong));
  }, [playingSong]);

  return { queue, setQueue, playingSong, setPlayingSong };
};

export default usePlayerState;
