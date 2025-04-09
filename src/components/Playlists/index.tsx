import React from 'react';
import { IPlaylistsItem } from '../../types/playlist';
import PlaylistRow from './PlaylistRow';
import usePlaylists from '@/fetchers/usePlaylists';

interface Props {
  id?: string | number;
  cover?: boolean;
  className?: string;
}

const Playlists: React.FC<Props> = ({ id, cover, className }) => {
  const [myList, otherList] = usePlaylists(parseInt(id as string, 10));

  if (!myList) {
    return <div className='text-2xl'>Loading...</div>;
  }

  if (myList.length === 0) {
    return (
      <div className='text-secondary-foreground text-center my-4'>
        当前用户未创建歌单
      </div>
    );
  }

  return (
    <div className={className}>
      {myList.map((item) => {
        return <PlaylistRow key={item.id} data={item} cover={cover} />;
      })}
    </div>
  );
};

export default Playlists;
