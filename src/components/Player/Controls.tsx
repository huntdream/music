import { FC, MouseEvent, useContext } from 'react';
import cls from 'classnames';
import { PauseIcon, PlayIcon, PrevIcon, NextIcon } from '../../icons/Audio';
import usePlayer from './usePlayer';
import { AppContext } from '../../context/App/App';

interface Props {}

const Controls: FC<Props> = () => {
  const { prev, next, pause, play, isPlaying } = usePlayer();
  const { isDesktop } = useContext(AppContext);

  const handlePause = (e: MouseEvent) => {
    e.stopPropagation();
    pause();
  };

  const handlePlay = (e: MouseEvent) => {
    e.stopPropagation();
    play();
  };

  return (
    <div className='flex justify-center items-center'>
      {isDesktop && (
        <PrevIcon
          className='w-8 h-8 cursor-pointer text-secondary hover:text-primary'
          onClick={prev}
        />
      )}
      <div
        className={cls(
          'w-8 h-8 rounded-2xl flex justify-center items-center shadow-around',
          isDesktop ? 'mx-8' : 'mx-4'
        )}
      >
        {isPlaying ? (
          <PauseIcon onClick={handlePause} className='w-6 h-6 cursor-pointer' />
        ) : (
          <PlayIcon onClick={handlePlay} className='w-6 h-6 cursor-pointer' />
        )}
      </div>

      {isDesktop && (
        <NextIcon
          className='w-8 h-8 cursor-pointer text-secondary hover:text-primary'
          onClick={next}
        />
      )}
    </div>
  );
};

export default Controls;
