import React from 'react';
import { IPic } from '../../types/event';
import Image from '../Image';

interface Props {
  images: IPic[];
}

const Pictures: React.FC<Props> = ({ images }) => {
  return (
    images?.length > 0 && (
      <div className='grid grid-cols-3 gap-2 max-w-md'>
        {images.map((image, index) => (
          <div
            key={index}
            className='w-full aspect-square overflow-hidden rounded-lg'
          >
            <Image
              src={image.originUrl}
              key={image.originUrl}
              alt={`Image ${index + 1}`}
              className='w-full h-full object-cover'
            />
          </div>
        ))}
      </div>
    )
  );
};

export default Pictures;
