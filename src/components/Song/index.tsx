import React, { CSSProperties, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { ISong } from '../../types/song';
import Image from '../Image';
import { msToMinutes } from '../../utils/msConvert';
import { ITrack } from '../../types/playlist';
import usePlayer from '../Player/usePlayer';

interface Props {
  song: ISong;
  className?: string;
  duration?: boolean;
  border?: boolean;
  onPlay?: (song: ITrack) => void;
  style?: CSSProperties;
}

const Song: React.FC<Props> = ({
  song,
  className,
  duration,
  style,
  onPlay,
}) => {
  const { play, appendQueue } = usePlayer();
  const { name, ar, al, dt } = song;

  const handleNavigate = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handlePlay = (song: ITrack) => {
    appendQueue(song);
    play(song);

    if (onPlay) {
      onPlay(song);
    }
  };

  return (
    <div
      className={cls(
        'flex px-2 py-1 items-center cursor-pointer rounded-md hover:bg-active overflow-hidden',
        className
      )}
      onClick={() => handlePlay(song)}
      style={style}
    >
      <div className='border w-10 h-10 rounded shrink-0'>
        <Image
          className='w-10 h-10 rounded'
          src={`${al?.picUrl}?param=50y50`}
          alt=''
        />
      </div>
      <div className='ml-2 flex-1 min-w-0 flex flex-col justify-between h-10'>
        <div className='flex'>
          <span className='truncate leading-5' title={name}>
            {name}
          </span>
        </div>
        <div className='flex text-sm leading-4 text-gray-500'>
          <div className='truncate' title={ar?.map((ar) => ar.name).join('/')}>
            {ar?.map((ar) => (
              <Link
                to={`/artist/${ar.id}`}
                className='after:content-["/"] after:px-px last:after:content-[""] hover:underline truncate'
                key={ar.id}
                onClick={handleNavigate}
              >
                {ar.name}
              </Link>
            ))}
          </div>
          <div
            className='before:content-["•"] before:mx-1 truncate'
            title={al?.name}
          >
            {al?.name}
          </div>
        </div>
      </div>
      {duration && (
        <div className='ml-auto text-gray-500'>{msToMinutes(dt)}</div>
      )}
    </div>
  );
};

export default Song;
