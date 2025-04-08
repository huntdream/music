import React, {
  createContext,
  createRef,
  ReactNode,
  RefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ISong } from '../../types/song';
import fetcher from '../../utils/fetcher';
import { uniqBy } from 'lodash-es';
import { IPlaylist } from '../../types/playlist';
import getSongUrl from '../../fetchers/getSongUrl';
import { useLocation } from 'react-router-dom';
import usePlayerState from '../../hooks/usePlayerState';

interface IPlayerContext {
  queue: ISong[];
  setQueue: (queue: ISong[]) => void;
  playingSong?: ISong;
  setPlayingSong: (song: ISong) => void;
  isPlaying: boolean;
  audioRef: RefObject<HTMLAudioElement | null>;
  next: () => void;
  prev: () => void;
  play: (song?: ISong) => void;
  pause: () => void;
  isShow: boolean;
  replaceQueue: (newQueue: ISong[] | string | number) => void;
  appendQueue: (song: ISong | ISong[]) => void;
}

export const PlayerContext = createContext({
  audioRef: createRef(),
} as IPlayerContext);

interface Props {
  children?: ReactNode;
}

const PlayerProvider: React.FC<Props> = ({ children }) => {
  const { queue, setQueue, playingSong, setPlayingSong } = usePlayerState();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if ('mediaSession' in navigator) {
      if (playingSong) {
        const metadata = new MediaMetadata({
          title: playingSong?.name,
          artist: playingSong?.ar.map((it) => it.name).join('/'),
          album: playingSong?.al.name,
          artwork: [
            {
              src: playingSong?.al.picUrl || '',
            },
          ],
        });

        navigator.mediaSession.metadata = metadata;

        navigator.mediaSession.setActionHandler('play', () => {
          play();
        });

        navigator.mediaSession.setActionHandler('pause', () => {
          pause();
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
          prev();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          next();
        });
      }
    }
  }, [playingSong]);

  useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(true);
      navigator.mediaSession.playbackState = 'playing';
    };

    const handlePause = () => {
      setIsPlaying(false);
      navigator.mediaSession.playbackState = 'paused';
    };

    const handleError = (e: Event) => {
      const event = e as unknown as SyntheticEvent<HTMLAudioElement>;

      console.log(event.currentTarget.error);
    };

    const handleEnded = () => {
      next();
    };

    audioRef.current?.addEventListener('play', handlePlay);
    audioRef.current?.addEventListener('pause', handlePause);
    audioRef.current?.addEventListener('error', handleError);
    audioRef.current?.addEventListener('ended', handleEnded);

    return () => {
      audioRef.current?.removeEventListener('play', handlePlay);
      audioRef.current?.removeEventListener('pause', handlePause);
      audioRef.current?.removeEventListener('error', handleError);
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, [audioRef.current, setIsPlaying, queue, playingSong]);

  const handlePlayingSongChange = async (song: ISong) => {
    setPlayingSong(song);

    const src = await getSongUrl(song.id);

    if (src && audioRef.current) {
      audioRef.current.src = src;
    }
  };

  const pause = () => {
    return audioRef.current?.pause();
  };

  const play = async (song?: ISong) => {
    if (song && song.id === playingSong?.id && isPlaying) {
      return pause();
    }

    let songToPlay = song || queue[0];

    if (songToPlay?.id !== playingSong?.id || !audioRef.current?.src) {
      await handlePlayingSongChange(songToPlay);
    }

    return audioRef.current?.play();
  };

  const next = () => {
    const index = queue.findIndex((item) => item.id === playingSong?.id);

    let nextIndex = index + 1;

    if (index >= queue.length - 1) {
      nextIndex = 0;
    }

    play(queue[nextIndex]);
  };

  const prev = () => {
    const index = queue.findIndex((item) => item.id === playingSong?.id);

    let prevIndex = index - 1;

    if (index === 0) {
      prevIndex = queue.length - 1;
    }

    play(queue[prevIndex]);
  };

  const filterQueue = (newQueue: ISong[]) =>
    newQueue.filter((s) => !s.noCopyrightRcmd);

  const replaceQueue = (newQueue: ISong[] | string | number) => {
    if (Array.isArray(newQueue)) {
      setQueue(filterQueue(newQueue));
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
    let newQueue = queue.concat(filterQueue(Array.prototype.concat(song)));

    setQueue(uniqBy(newQueue, 'id'));
  };

  const isShow = !!playingSong && !pathname.startsWith('/playing');

  const context: IPlayerContext = {
    queue,
    setQueue,
    playingSong,
    setPlayingSong: handlePlayingSongChange,
    isPlaying,
    isShow,
    audioRef,
    next,
    prev,
    play,
    pause,
    replaceQueue,
    appendQueue,
  };

  return (
    <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
  );
};

export default PlayerProvider;
