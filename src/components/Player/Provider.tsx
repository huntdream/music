import React, {
  createContext,
  createRef,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from 'react';
import { ISong } from '../../types/song';
import fetcher from '../../utils/fetcher';
import { uniqBy } from 'lodash-es';
import { ITrack, IPlaylist } from '../../types/playlist';

interface IPlayerContext {
  queue: ISong[];
  setQueue: (queue: ISong[]) => void;
  playingSong?: ISong;
  setPlayingSong: (song: ISong) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: RefObject<HTMLAudioElement>;
  next: () => void;
  prev: () => void;
  play: (song?: ISong) => void;
  pause: () => void;
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
  const [queue, setQueue] = useState<ISong[]>([]);
  const [playingSong, setPlayingSong] = useState<ISong>();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audio = audioRef.current;

  const pause = () => {
    audio?.pause();
  };

  const play = (song?: ITrack) => {
    if (song && song.id !== playingSong?.id) {
      audio?.pause();
      setPlayingSong(song);

      return;
    }

    if (!song && !playingSong && queue.length) {
      setPlayingSong(queue[0]);
    }

    audio?.play();
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
    newQueue.filter((s) => s.copyright < 2);

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

  const context: IPlayerContext = {
    queue,
    setQueue,
    playingSong,
    setPlayingSong,
    isPlaying,
    setIsPlaying,
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
