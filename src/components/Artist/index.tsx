import { FC } from 'react';
import { IArtist } from '../../types/playlist';
import Image from '../Image';

interface Props {
  className?: string;
  data: IArtist;
}

const Artist: FC<Props> = ({ className, data }) => {
  const { name, id, picUrl } = data;

  return (
    <div className='px-2 py-1 flex items-center rounded-md hover:bg-active'>
      <Image src={picUrl} className='h-10 w-10 rounded-md' />
      <div className='ml-2 flex items-center h-10'>{name}</div>
    </div>
  );
};

export default Artist;
