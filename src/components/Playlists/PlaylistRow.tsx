import React from 'react';
import Image from '../Image';
import { useNavigate } from 'react-router-dom';
import { IPlaylistsItem } from '../../types/playlist';

interface Props {
  data: IPlaylistsItem;
  cover?: boolean;
}

const PlaylistRow: React.FC<Props> = ({ data, cover = true }) => {
  const { id, name, coverImgUrl, trackCount, creator } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/playlist/${id}`);
  };

  return (
    <div
      className='flex items-center p-2 cursor-pointer rounded-md hover:bg-active'
      onClick={handleClick}
    >
      {cover && (
        <Image
          src={`${coverImgUrl}?param=240y240`}
          alt=''
          className='h-12 w-12 rounded-md mr-3'
        />
      )}
      <div className='flex flex-1 justify-between'>
        <div className='text-base text-ellipsis' title={name}>
          {name}
        </div>
      </div>
    </div>
  );
};

export default PlaylistRow;
