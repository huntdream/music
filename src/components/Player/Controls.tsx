import { FC, MouseEvent, use } from 'react';
import clsx from 'clsx';
import usePlayer from './usePlayer';
import { AppContext } from '../../context/App/App';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import IconButton from '../IconButton';

interface Props {
  isMini?: boolean;
}

const Controls: FC<Props> = ({ isMini }) => {
  const { prev, next, pause, play, isPlaying, playingSong } = usePlayer();
  const { isDesktop } = use(AppContext);

  const handlePlay = (e: MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      pause();
    } else {
      play(playingSong);
    }
  };

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    prev();
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    next();
  };

  const showNextPrev = isDesktop || !isMini;

  return (
    <div className='flex justify-center items-center'>
      {showNextPrev && (
        <IconButton onClick={handlePrev}>
          <SkipBack />
        </IconButton>
      )}
      <div className={clsx(isDesktop ? 'mx-8' : 'mx-4')}>
        <IconButton onClick={handlePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </IconButton>
      </div>

      {showNextPrev && (
        <IconButton onClick={handleNext}>
          <SkipForward />
        </IconButton>
      )}
    </div>
  );
};

export default Controls;
