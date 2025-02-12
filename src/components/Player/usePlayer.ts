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
    setPlayingSong,
    isShow,
  } = useContext(PlayerContext);

  return {
    queue,
    setIsPlaying,
    isPlaying,
    playingSong,
    setPlayingSong,
    audioRef,
    next,
    prev,
    pause,
    play,
    isShow,
    replaceQueue,
    appendQueue,
  };
};

export default usePlayer;
