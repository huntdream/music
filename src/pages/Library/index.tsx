import React, { useContext } from 'react';
import { useUser } from '../../context/App';
import usePlaylists from '../../fetchers/usePlaylists';
import Playlists from '../../components/Playlists';
import Auth from '../../components/Auth';
import { AppContext } from '../../context/App/App';

interface Props {}

const Library: React.FC<Props> = () => {
  const [user] = useUser();
  const { isDesktop } = useContext(AppContext);

  const [myList, otherList] = usePlaylists(user?.userId);

  if (!user?.userId && !isDesktop) {
    return <Auth className='h-full w-full flex justify-center items-center' />;
  }

  return (
    <div className='library'>
      <Playlists list={myList} />
      <Playlists list={otherList} />
    </div>
  );
};

export default Library;
