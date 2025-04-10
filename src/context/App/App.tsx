import React, {
  createContext,
  ReactNode,
  useLayoutEffect,
  useState,
} from 'react';
import { IUser } from '../../types/user';
import useMediaQuery from '../../hooks/useMatchMedia';
import useLikeList from '../../fetchers/useLikeList';

interface IAppContext {
  user?: IUser;
  setUser: (user: IUser) => void;
  isLoggedIn: boolean;
  isDesktop: boolean;
  likeList: number[];
}

export const AppContext = createContext({} as IAppContext);

interface Props {
  children?: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const isDesktop = useMediaQuery('(min-width:768px)');
  const likes = useLikeList(user?.userId);

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
    isLoggedIn: !!user?.userId,
    likeList: likes,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppProvider;
