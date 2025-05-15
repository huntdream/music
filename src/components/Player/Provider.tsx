import React, {
  createContext,
  createRef,
  ReactNode,
  RefObject,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { ISong } from '../../types/song';
import fetcher from '../../utils/fetcher';
import { uniqBy } from 'lodash-es';
import { IPlaylist } from '../../types/playlist';
import { getSongUrl } from '../../fetchers/song';
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

  const handlePlayingSongChange = async (song: ISong) => {
    const src = await getSongUrl(song.id);

    if (src && audioRef.current) {
      setPlayingSong(song);

      audioRef.current.src = src;
    }

    return src;
  };

  const pause = useCallback(() => {
    return audioRef.current?.pause();
  }, []);

  const play = useCallback(
    async (song?: ISong) => {
      if (song && song.id === playingSong?.id && isPlaying) {
        return pause();
      }

      let songToPlay = song || queue[0];

      if (songToPlay?.id !== playingSong?.id || !audioRef.current?.src) {
        const src = await handlePlayingSongChange(songToPlay);

        if (!src) {
          return;
        }
      }

      return audioRef.current?.play();
    },
    [playingSong, isPlaying, queue]
  );

  const next = useCallback(() => {
    const index = queue.findIndex((item) => item.id === playingSong?.id);

    let nextIndex = index + 1;

    if (index >= queue.length - 1) {
      nextIndex = 0;
    }

    play(queue[nextIndex]);
  }, [queue, playingSong, play]);

  const prev = useCallback(() => {
    const index = queue.findIndex((item) => item.id === playingSong?.id);

    let prevIndex = index - 1;

    if (index === 0) {
      prevIndex = queue.length - 1;
    }

    play(queue[prevIndex]);
  }, [queue, playingSong, play]);

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

    const audioEl = audioRef.current;

    if (audioEl) {
      audioEl.addEventListener('play', handlePlay);
      audioEl.addEventListener('pause', handlePause);
      audioEl.addEventListener('error', handleError);
      audioEl.addEventListener('ended', handleEnded);
    }

    return () => {
      if (audioEl) {
        audioEl.removeEventListener('play', handlePlay);
        audioEl.removeEventListener('pause', handlePause);
        audioEl.removeEventListener('error', handleError);
        audioEl.removeEventListener('ended', handleEnded);
      }
    };
  }, [audioRef, next]);

  useEffect(() => {
    if ('mediaSession' in navigator && playingSong) {
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
  }, [playingSong, play, pause, next, prev]);

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
    const newSongs = Array.isArray(song) ? song : [song];
    let newQueue = queue.concat(filterQueue(newSongs));
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
