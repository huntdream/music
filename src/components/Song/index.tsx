import React, { CSSProperties, MouseEvent, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';
import { ISong } from '../../types/song';
import Image from '../Image';
import { msToMinutes } from '../../utils/msConvert';
import { ITrack } from '../../types/playlist';
import usePlayer from '../Player/usePlayer';
import Artists from '../Artist/Artists';
import playingIcon from '../../assets/playing.gif';
import { PauseIcon, PlayIcon } from '../../icons/Audio';
import Actions from './Actions';
import { AppContext } from '../../context/App/App';
import Heart from '../../icons/Heart';

interface Props {
  song: ISong;
  className?: string;
  duration?: boolean;
  border?: boolean;
  standalone?: boolean;
  onPlay?: (song: ITrack) => void;
  style?: CSSProperties;
}

const Song: React.FC<Props> = ({
  song,
  className,
  duration,
  standalone,
  style,
  onPlay,
}) => {
  const { play, pause, appendQueue, playingSong, isPlaying } = usePlayer();
  const { isDesktop, likeList } = useContext(AppContext);
  const { name, ar, al, dt, id } = song;
  const isCurrentSong = playingSong?.id === song.id;
  const isSongPlaying = isPlaying && isCurrentSong;

  const isLiked = useMemo(() => likeList.includes(id), []);

  const handlePlay = (song: ITrack) => {
    if (isSongPlaying) {
      pause();
      return;
    }

    appendQueue(song);
    play(song);

    if (onPlay) {
      onPlay(song);
    }
  };

  return (
    <div
      className={cls(
        'flex py-2 pl-2 items-center cursor-pointer rounded-md overflow-hidden hover:bg-active',
        standalone ? 'bg-gray-100' : '',
        className
      )}
      onClick={() => handlePlay(song)}
      style={style}
    >
      <div className='rounded-sm shrink-0 relative'>
        <Image
          className='w-12 h-12 rounded-sm'
          src={`${al?.picUrl}?param=50y50`}
          alt=''
        />
        {isCurrentSong && (
          <div className='absolute rounded-sm inset-0 p-3 bg-gray-600/35'>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
        )}
      </div>
      <div className='ml-2 flex-1 min-w-0 flex flex-col justify-between'>
        <div className='flex'>
          <span className='truncate' title={name}>
            {name}
          </span>
        </div>
        <div className='flex items-center text-sm text-gray-500'>
          {isLiked && <Heart className='h-4 w-4 mr-1 mt-0.5 text-red-500' />}
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
      {isSongPlaying && isDesktop && (
        <Image className='w-4 h-4 mr-4' src={playingIcon} />
      )}
      {duration && isDesktop && (
        <div className='ml-auto text-gray-500'>{msToMinutes(dt)}</div>
      )}
      <Actions id={id} />
    </div>
  );
};

export default Song;
