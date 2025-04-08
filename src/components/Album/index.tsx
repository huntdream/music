import { FC } from 'react';
import { IAlbum } from '../../types/playlist';
import Image from '../Image';

interface Props {
  className?: string;
  album: IAlbum;
  showCover?: boolean;
}

const Album: FC<Props> = ({ className, album, showCover = true }) => {
  const { name, id, picUrl } = album;

  return (
    <div className='flex py-2 pl-2 items-center cursor-pointer rounded-md overflow-hidden hover:bg-secondary'>
      {showCover && <Image src={picUrl} className='h-12 w-12 rounded-md' />}
      <div className='ml-2 flex items-center h-12'>{name}</div>
    </div>
  );
};

export default Album;
