import React from 'react';
import { IPlaylistsItem } from '../../types/playlist';
import PlaylistRow from './PlaylistRow';

interface Props {
  list?: IPlaylistsItem[];
  cover?: boolean;
  className?: string;
}

const Playlists: React.FC<Props> = ({ list = [], cover, className }) => {
  return (
    <div className={className}>
      {list.map((item) => {
        return <PlaylistRow key={item.id} data={item} cover={cover} />;
      })}
    </div>
  );
};

export default Playlists;
