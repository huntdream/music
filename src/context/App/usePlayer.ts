import { uniqBy } from 'lodash-es';
import { useContext, useEffect } from 'react';
import { IPlaylist, ITrack } from '../../types/playlist';
import { ISong } from '../../types/song';
import fetcher from '../../utils/fetcher';
import { AppContext } from './App';

const usePlayer = () => {
  const {
    audioRef,
    queue,
    setQueue,
    isPlaying,
    setIsPlaying,
    playingSong,
    setPlayingSong,
  } = useContext(AppContext);

  const audio = audioRef.current;

  const play = (song?: ITrack) => {
    if (song && song.id !== playingSong?.id) {
      setPlayingSong(song);
    }

    if (!song && !playingSong && queue.length) {
      setPlayingSong(queue[0]);
    }

    audio?.play();
  };

  useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio?.addEventListener('play', handlePlay);
    audio?.addEventListener('pause', handlePause);

    return () => {
      audio?.removeEventListener('play', handlePlay);
      audio?.removeEventListener('pause', handlePause);
    };
  }, [audio, setIsPlaying]);

  const pause = () => {
    audio?.pause();
  };

  const next = () => {
    const index = queue.findIndex((item) => item.id === playingSong?.id);

    let nextIndex = index + 1;

    if (index >= queue.length - 1) {
      nextIndex = 0;
    }

    setPlayingSong(queue[nextIndex]);
  };

  const prev = () => {
    const index = queue.findIndex((item) => item.id === playingSong?.id);

    let prevIndex = index - 1;

    if (index === 0) {
      prevIndex = queue.length - 1;
    }

    play(queue[prevIndex]);
  };

  const replaceQueue = (newQueue: ISong[] | string | number) => {
    if (Array.isArray(newQueue)) {
      setQueue(newQueue);
      play(newQueue[0]);
    } else if (newQueue) {
      fetcher<any, { playlist: IPlaylist }>(
        `/playlist/detail?id=${newQueue}`
      ).then((res) => {
        replaceQueue(res?.playlist?.tracks);
      });
    }
  };

  const appendQueue = (song: ISong | ISong[]) => {
    let newQueue = [];
    if (Array.isArray(song)) {
      newQueue = queue.concat(song);
    } else {
      newQueue.push(song);
    }

    setQueue(uniqBy(newQueue, 'id'));
  };

  return {
    audioRef,
    queue,
    playingSong,
    isPlaying,
    play,
    pause,
    next,
    prev,
    replaceQueue,
    appendQueue,
  };
};

export default usePlayer;
