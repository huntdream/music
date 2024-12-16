import React, { MouseEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from 'classnames';
import useSongUrl from '../../fetchers/useSongUrl';
import Image from '../Image';
import { AppContext } from '../../context/App/App';
import useNavigateLyric from '../Lyric/useNavigateLyric';
import { PlayerContext } from './Provider';
import Artists from '../Artist/Artists';
import Progress from './Progress';
import Controls from './Controls';
import Actions from './Actions';

interface Props {}

const Player: React.FC<Props> = () => {
  const { playingSong, audioRef } = useContext(PlayerContext);
  const { isDesktop } = useContext(AppContext);
  const navigateLyric = useNavigateLyric();

  const handleClick = (e: MouseEvent) => {
    if (isDesktop) return;

    e.stopPropagation();
    e.preventDefault();

    navigateLyric(playingSong!.id);
  };

  return (
    <div
      className={cls(
        'fixed bottom-0 left-0 right-0 px-4 z-50 shadow-around bg-white rounded-(--safe-radius)  transition-transform duration-200 ease-in-out ',
        playingSong
          ? 'translate-x-0 opacity-100'
          : 'opacity-0 translate-y-[calc(var(--safe-b)/2+56px)]',
        isDesktop
          ? 'py-2 mb-(--safe-b) mx-(--safe-b)'
          : 'mx-2 rounded-tl-md rounded-tr-md -translate-y-[calc(var(--safe-b)/2+56px)]'
      )}
    >
      <audio ref={audioRef}></audio>
      <div
        className='flex items-center justify-between h-16'
        onClick={handleClick}
      >
        <div
          className={cls(
            'flex items-center',
            isDesktop ? 'w-[30%] min-w-44' : 'min-w-0 flex-1'
          )}
        >
          <div className='mr-4'>
            <Image
              className='w-12 h-12 rounded-md'
              src={`${playingSong?.al?.picUrl}?param=50y50`}
              alt=''
            />
          </div>
          <div className='flex flex-col flex-1 min-w-0'>
            <div className='truncate' title={playingSong?.name}>
              {playingSong?.name}
            </div>
            <div className='flex items-center min-w-0 text-secondary'>
              <div className='text-sm flex items-center truncate'>
                <Artists artists={playingSong?.ar} />
              </div>
            </div>
          </div>
        </div>
        <div
          className={cls(
            isDesktop
              ? 'flex flex-col justify-between h-full pt-1.5 flex-1 max-w-[722px] w-2/5'
              : 'ml-auto'
          )}
        >
          <Controls />
          {isDesktop && <Progress duration={playingSong?.dt} />}
        </div>
        <div
          className={cls(
            'flex justify-end',
            isDesktop ? 'w-[30%] min-w-44' : ''
          )}
        >
          <Actions />
        </div>
      </div>
    </div>
  );
};

export default Player;
