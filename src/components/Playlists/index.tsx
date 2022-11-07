import React from 'react';
import { IPlaylistsItem } from '../../types/playlist';
import PlaylistCard from './PlaylistCard';
import './style.scss';

interface Props {
  list?: IPlaylistsItem[];
}

const Playlists: React.FC<Props> = ({ list = [] }) => {
  return (
    <div className='playlists'>
      {list.map((item) => {
        return <PlaylistCard key={item.id} data={item} />;
      })}
    </div>
  );
};

export default Playlists;
