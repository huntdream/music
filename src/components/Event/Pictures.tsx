import React from 'react';
import cls from 'classnames';
import { IPic } from '../../types/event';
import Image from '../Image';

interface Props {
  pics: IPic[];
}

const Pictures: React.FC<Props> = ({ pics }) => {
  const picsCount = pics.length;
  const isSingle = picsCount === 1;
  const rows = Math.ceil(picsCount / 3);
  const cols = Math.min(picsCount, 3);

  const height = ['h-32', 'h-64', 'h96'][rows - 1];

  return (
    pics?.length > 0 && (
      <div
        className={cls(
          'grid overflow-hidden max-w-96 max-h-96',
          `grid-cols-${cols} grid-rows-${rows}`,
          isSingle ? '' : height
        )}
      >
        {pics.map((pic) => (
          <div className='overflow-hidden col-auto'>
            <Image
              src={pic.originUrl}
              key={pic.originUrl}
              className={cls(
                'object-contain',
                isSingle ? 'max-w-full max-h-full' : 'w-full'
              )}
              alt=''
            />
          </div>
        ))}
      </div>
    )
  );
};

export default Pictures;
