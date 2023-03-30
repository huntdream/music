import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { ISong } from '../../types/song';
import usePlayer from '../../context/App/usePlayer';
import Image from '../Image';

interface Props {
  song: ISong;
  className?: string;
}

const Song: React.FC<Props> = ({ song, className }) => {
  const { play } = usePlayer();

  const handleNavigate = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cls(
        'flex p-1 border items-center cursor-pointer hover:bg-slate-50',
        className
      )}
      onClick={() => play(song)}
    >
      <div className='border w-10 h-10 rounded overflow-hidden'>
        <Image
          className='w-10 h-10'
          src={`${song.al?.picUrl}?param=50y50`}
          alt=''
        />
      </div>
      <div className='ml-2'>
        <div className=''>
          <span className='ellipsis' title={song.name}>
            {song.name}
          </span>
        </div>
        <div className='text-sm text-gray-500'>
          <div className='ellipsis'>
            {song.ar?.map((ar) => (
              <Link
                to={`/artist/${ar.id}`}
                className='after:content-["/"] after:px-px last:after:content-[""] hover:underline'
                key={ar.id}
                title={ar.name}
                onClick={handleNavigate}
              >
                {ar.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
