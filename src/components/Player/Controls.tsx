import { FC, MouseEvent, useContext } from 'react';
import clsx from 'clsx';
import { PauseIcon, PlayIcon } from '../../icons/Audio';
import usePlayer from './usePlayer';
import { AppContext } from '../../context/App/App';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import IconButton from '../IconButton';

interface Props {}

const Controls: FC<Props> = () => {
  const { prev, next, pause, play, isPlaying, playingSong } = usePlayer();
  const { isDesktop } = useContext(AppContext);

  const handlePlay = (e: MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      pause();
    } else {
      play(playingSong);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      {isDesktop && (
        <IconButton onClick={prev}>
          <SkipBack />
        </IconButton>
      )}
      <div className={clsx(isDesktop ? 'mx-8' : 'mx-4')}>
        <IconButton onClick={handlePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </IconButton>
      </div>

      {isDesktop && (
        <IconButton onClick={next}>
          <SkipForward />
        </IconButton>
      )}
    </div>
  );
};

export default Controls;
