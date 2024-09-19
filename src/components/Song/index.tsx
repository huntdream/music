import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { ISong } from '../../types/song';
import usePlayer from '../../context/App/usePlayer';
import Image from '../Image';
import { msToMinutes } from '../../utils/msConvert';
import { ITrack } from '../../types/playlist';

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

  const handleNavigate = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handlePlay = (song: ITrack) => {
    play(song);

    if (onPlay) {
      onPlay(song);
    }
  };

  return (
    <div
      className={cls(
        'flex px-2 py-1 items-center cursor-pointer hover:bg-slate-50 overflow-hidden',
        className,
        border
      )}
      onClick={() => handlePlay(song)}
    >
      <div className='border w-10 h-10 rounded shrink-0'>
        <Image
          className='w-10 h-10 rounded'
          src={`${song.al?.picUrl}?param=50y50`}
          alt=''
        />
      </div>
      <div className='ml-2 flex-1 min-w-0'>
        <div className='flex'>
          <span className='truncate' title={song.name}>
            {song.name}
          </span>
        </div>
        <div className='flex text-sm text-gray-500'>
          <div
            className='truncate'
            title={song.ar?.map((ar) => ar.name).join('/')}
          >
            {song.ar?.map((ar) => (
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
            title={song.al?.name}
          >
            {song.al?.name}
          </div>
        </div>
      </div>
      {duration && (
        <div className='ml-auto text-gray-500'>{msToMinutes(song.dt)}</div>
      )}
    </div>
  );
};

export default Song;
