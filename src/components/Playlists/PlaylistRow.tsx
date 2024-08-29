import React from 'react';
import User from '../User';
import Image from '../Image';
import { IPlaylistsItem } from '../../types/playlists';
import './style.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  data: IPlaylistsItem;
}

const PlaylistRow: React.FC<Props> = ({ data }) => {
  const { id, name, coverImgUrl, trackCount, creator } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/playlist/${id}`);
  };

  return (
    <div className='playlists-row' onClick={handleClick}>
      <Image
        src={`${coverImgUrl}?param=240y240`}
        alt=''
        className='playlists-row-cover-img'
      />
      <div className='playlists-row-info'>
        <div className='playlists-row-name' title={name}>
          {name}
        </div>
        <div className='playlists-row-trackcount'>{trackCount}首</div>
      </div>
    </div>
  );
};

export default PlaylistRow;
