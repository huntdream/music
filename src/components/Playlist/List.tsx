import React, { memo } from 'react';
import { ISong } from '../../types/song';
import Song from '../Song';

interface Props {
  list: ISong[];
  onPlay: (song: ISong) => void;
}

const List: React.FC<Props> = memo(({ list, onPlay }) => {
  return list.map((track) => (
    <Song song={track} key={track.id} onPlay={onPlay} duration />
  ));
});

export default List;
