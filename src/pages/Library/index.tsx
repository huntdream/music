import React from 'react';
import { useUser } from '../../context/App';
import usePlaylists from '../../fetchers/usePlaylists';
import Playlists from '../../components/Playlists';
import './style.scss';

interface Props {}

const Library: React.FC<Props> = () => {
  const [user] = useUser();

  const [myList, otherList] = usePlaylists(user?.userId);

  return (
    <div className='library'>
      <Playlists list={myList} />
      <Playlists list={otherList} />
    </div>
  );
};

export default Library;
