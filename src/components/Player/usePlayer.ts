import { useContext } from 'react';
import { PlayerContext } from './Provider';

const usePlayer = () => {
  const {
    queue,
    setIsPlaying,
    isPlaying,
    playingSong,
    audioRef,
    next,
    prev,
    pause,
    play,
    replaceQueue,
    appendQueue,
  } = useContext(PlayerContext);

  return {
    queue,
    setIsPlaying,
    isPlaying,
    playingSong,
    audioRef,
    next,
    prev,
    pause,
    play,
    replaceQueue,
    appendQueue,
  };
};

export default usePlayer;
