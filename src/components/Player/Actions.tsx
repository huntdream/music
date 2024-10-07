import { FC, useContext } from 'react';
import cls from 'classnames';
import { LyricIcon } from '../../icons/Audio';
import usePlayer from './usePlayer';
import { AppContext } from '../../context/App/App';
import Queue from './Queue';
import useNavigateLyric from '../Lyric/useNavigateLyric';
import Volume from './Volume';

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
        <>
          <Volume />
          <LyricIcon
            className={cls(
              'w-8 h-8 cursor-pointer hover:text-primary',
              isLyricOpen ? 'text-primary' : 'text-secondary '
            )}
            onClick={handleClickLyric}
          />
        </>
      )}
      <Queue />
    </div>
  );
};

export default Actions;
