import { use } from 'react';
import { PlayerContext } from './Provider';

const usePlayer = () => {
  const {
    queue,
    isPlaying,
    playingSong,
    audioRef,
    next,
    prev,
    pause,
    play,
    clearQueue,
    replaceQueue,
    appendQueue,
    setPlayingSong,
    isShow,
  } = use(PlayerContext);

  return {
    queue,
    isPlaying,
    playingSong,
    setPlayingSong,
    audioRef,
    next,
    prev,
    pause,
    play,
    isShow,
    clearQueue,
    replaceQueue,
    appendQueue,
  };
};

export default usePlayer;
