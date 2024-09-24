import React from 'react';
import cls from 'classnames';
import { IPlaylistsItem } from '../../types/playlist';
import PlaylistRow from './PlaylistRow';

interface Props {
  list?: IPlaylistsItem[];
  cover?: boolean;
  divide?: boolean;
  className?: string;
}

const Playlists: React.FC<Props> = ({
  list = [],
  cover,
  className,
  divide = true,
}) => {
  return (
    <div
      className={cls(className, {
        'divide-y': divide,
      })}
    >
      {list.map((item) => {
        return <PlaylistRow key={item.id} data={item} cover={cover} />;
      })}
    </div>
  );
};

export default Playlists;
