import { FC, MouseEvent, useContext } from 'react';
import cls from 'classnames';
import {
  PauseIcon,
  PlayIcon,
  PrevIcon,
  NextIcon,
  PlaylistIcon,
  LyricIcon,
} from '../../icons/Audio';
import usePlayer from './usePlayer';
import { AppContext } from '../../context/App/App';
import Queue from './Queue';
import useNavigateLyric from '../Lyric/useNavigateLyric';

interface Props {}

const Actions: FC<Props> = () => {
  const { playingSong } = usePlayer();
  const { isDesktop } = useContext(AppContext);
  const navigateLyric = useNavigateLyric();

  const handleClickLyric = () => {
    if (playingSong) {
      navigateLyric(playingSong?.id);
    }
  };

  const isLyricOpen = window.location.pathname.startsWith('/lyric');

  return (
    <div className='flex justify-center items-center space-x-2'>
      {isDesktop && (
        <LyricIcon
          className={cls(
            'w-8 h-8 cursor-pointer hover:text-primary',
            isLyricOpen ? 'text-primary' : 'text-secondary '
          )}
          onClick={handleClickLyric}
        />
      )}
      <Queue />
    </div>
  );
};

export default Actions;
