import React, { CSSProperties, use, useMemo } from 'react';
import clsx from 'clsx';
import { toast } from 'sonner';
import { ISong } from '../../types/song';
import Image from '../Image';
import { msToMinutes } from '../../utils/msConvert';
import usePlayer from '../Player/usePlayer';
import Artists from '../Artist/Artists';
import playingIcon from '../../assets/playing.gif';
import Actions from './Actions';
import { AppContext } from '../../context/App/App';
import Heart from '../../icons/Heart';
import { Pause, Play } from 'lucide-react';

interface Props {
  song: ISong;
  className?: string;
  duration?: boolean;
  border?: boolean;
  standalone?: boolean;
  showAlbum?: boolean;
  showCover?: boolean;
  onPlay?: (song: ISong) => void;
  style?: CSSProperties;
}

const Song: React.FC<Props> = ({
  song,
  className,
  duration,
  standalone,
  showAlbum,
  showCover = true,
  style,
  onPlay,
}) => {
  const { play, pause, appendQueue, playingSong, isPlaying } = usePlayer();
  const { isDesktop, likeList } = use(AppContext);
  const { name, ar, al, dt, id, noCopyrightRcmd } = song;
  const isCurrentSong = playingSong?.id === song.id;
  const isSongPlaying = isPlaying && isCurrentSong;
  const canPlay = !noCopyrightRcmd;

  const isLiked = useMemo(() => likeList.includes(id), []);

  const handlePlay = (song: ISong) => {
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
      className={clsx(
        'flex py-2 pl-2 items-center cursor-pointer rounded-md overflow-hidden hover:bg-secondary',
        standalone ? 'bg-secondary' : '',
        className
      )}
      onClick={() => handlePlay(song)}
      style={style}
    >
      {showCover && (
        <div className='rounded-sm shrink-0 relative'>
          <Image
            className='w-12 h-12 rounded-sm'
            src={`${al?.picUrl}?param=50y50`}
            alt=''
          />
          {isCurrentSong && (
            <div className='absolute rounded-sm inset-0 p-3 bg-gray-600/35'>
              {isPlaying ? <Pause /> : <Play />}
            </div>
          )}
        </div>
      )}
      <div className='ml-2 flex-1 min-w-0 flex flex-col justify-between'>
        <div className='flex'>
          <span
            className={clsx(
              'truncate',
              canPlay ? '' : 'text-secondary-foreground'
            )}
            title={name}
          >
            {name}
          </span>
        </div>
        <div className='flex items-center text-sm text-secondary-foreground'>
          {isLiked && <Heart className='h-4 w-4 mr-1 text-red-500' />}
          <div className='truncate' title={ar?.map((ar) => ar.name).join('/')}>
            <Artists artists={ar} />
          </div>
          {showAlbum && (
            <div
              className='before:content-["•"] before:mx-1 truncate'
              title={al?.name}
            >
              {al?.name}
            </div>
          )}
        </div>
      </div>
      {isSongPlaying && isDesktop && (
        <Image className='w-4 h-4 mr-4' src={playingIcon} />
      )}
      {duration && isDesktop && (
        <div className='ml-auto text-secondary-foreground'>
          {msToMinutes(dt)}
        </div>
      )}
      <Actions id={id} />
    </div>
  );
};

export default Song;
