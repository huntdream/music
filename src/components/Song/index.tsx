import React, { CSSProperties, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { ISong } from '../../types/song';
import Image from '../Image';
import { msToMinutes } from '../../utils/msConvert';
import { ITrack } from '../../types/playlist';
import usePlayer from '../Player/usePlayer';
import Artists from '../Artist/Artists';

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
        'flex p-2 items-center cursor-pointer rounded-md hover:bg-active overflow-hidden',
        className
      )}
      onClick={() => handlePlay(song)}
      style={style}
    >
      <div className='border rounded shrink-0'>
        <Image
          className='w-12 h-12 rounded'
          src={`${al?.picUrl}?param=50y50`}
          alt=''
        />
      </div>
      <div className='ml-2 flex-1 min-w-0 flex flex-col justify-between'>
        <div className='flex'>
          <span className='truncate' title={name}>
            {name}
          </span>
        </div>
        <div className='flex text-sm text-gray-500'>
          <div className='truncate' title={ar?.map((ar) => ar.name).join('/')}>
            <Artists artists={ar} />
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
