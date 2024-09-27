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
  isDesktop: boolean;
}

export const AppContext = createContext({} as IAppContext);

interface Props {
  children?: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const isDesktop = useMediaQuery('(min-width:768px)');

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
    isDesktop,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
