import React from 'react';
import { IPlaylistsItem } from '../../types/playlist';
import PlaylistRow from './PlaylistRow';

interface Props {
  list?: IPlaylistsItem[];
}

const Playlists: React.FC<Props> = ({ list = [] }) => {
  return (
    <div className='playlists'>
      {list.map((item) => {
        return <PlaylistRow key={item.id} data={item} />;
      })}
    </div>
  );
};

export default Playlists;
