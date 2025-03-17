import Image from '@/components/Image';
import React from 'react';

interface Props {
  onClick: () => void;
  name: string;
  picUrl: string;
}

const Card: React.FC<Props> = ({ name, picUrl, onClick }) => {
  return (
    <div
      className='w-32 md:w-44 group flex flex-col items-center p-2 hover:bg-secondary rounded-md transition-colors'
      onClick={onClick}
    >
      <div className='relative w-full aspect-square overflow-hidden rounded-md'>
        <Image
          src={picUrl}
          className='w-full h-full object-cover cursor-pointer transform group-hover:scale-105 transition-transform'
        />
      </div>
      <div className='mt-2 text-sm text-center text-secondary-foreground cursor-pointer line-clamp-1 px-1'>
        {name}
      </div>
    </div>
  );
};

export default Card;
