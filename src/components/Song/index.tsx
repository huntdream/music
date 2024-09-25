import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { ISong } from '../../types/song';
import usePlayer from '../../context/App/usePlayer';
import Image from '../Image';
import { msToMinutes } from '../../utils/msConvert';
import { ITrack } from '../../types/playlist';
import toast from 'react-hot-toast';

interface Props {
  song: ISong;
  className?: string;
  duration?: boolean;
  border?: boolean;
  onPlay?: (song: ITrack) => void;
}

const Song: React.FC<Props> = ({
  song,
  className,
  duration,
  border,
  onPlay,
}) => {
  const { play } = usePlayer();
  const { name, ar, al, dt, copyright } = song;

  const handleNavigate = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handlePlay = (song: ITrack) => {
    if (copyright !== 1) {
      toast('没有版权呢，要不去其他地方看看吧👀');
      return;
    }

    play(song);

    if (onPlay) {
      onPlay(song);
    }
  };

  return (
    <div
      className={cls(
        'flex px-2 py-1 items-center cursor-pointer hover:bg-active overflow-hidden',
        className,
        border
      )}
      onClick={() => handlePlay(song)}
    >
      <div className='border w-10 h-10 rounded shrink-0'>
        <Image
          className='w-10 h-10 rounded'
          src={`${al?.picUrl}?param=50y50`}
          alt=''
        />
      </div>
      <div className='ml-2 flex-1 min-w-0'>
        <div className='flex'>
          <span className='truncate' title={name}>
            {name}
          </span>
        </div>
        <div className='flex text-sm text-gray-500'>
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
