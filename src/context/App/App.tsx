import React, {
  createContext,
  createRef,
  ReactNode,
  RefObject,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ISong } from '../../types/song';
import { IUser } from '../../types/user';
import useMediaQuery from '../../hooks/useMatchMedia';

interface IAppContext {
  user?: IUser;
  setUser: (user: IUser) => void;
  queue: ISong[];
  setQueue: (queue: ISong[]) => void;
  playingSong?: ISong;
  setPlayingSong: (song: ISong) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: RefObject<HTMLAudioElement>;
  isDesktop: boolean;
}

export const AppContext = createContext({
  audioRef: createRef(),
} as IAppContext);

interface Props {
  children?: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [queue, setQueue] = useState<ISong[]>([]);
  const [playingSong, setPlayingSong] = useState<ISong>();
  const [isPlaying, setIsPlaying] = useState(false);
  const isDesktop = useMediaQuery('(min-width:768px)');
  const audioRef = useRef<HTMLAudioElement>(null);

  useLayoutEffect(() => {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userData = JSON.parse(userString);

      setUser(userData);
    }
  }, []);

  const handleSetUser = (user?: IUser) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const context: IAppContext = {
    user,
    setUser: handleSetUser,
    queue,
    setQueue,
    playingSong,
    setPlayingSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    isDesktop,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
