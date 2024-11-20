import { FC, useContext } from 'react';
import cls from 'classnames';
import { LyricIcon } from '../../icons/Audio';
import usePlayer from './usePlayer';
import { AppContext } from '../../context/App/App';
import Queue from './Queue';
import useNavigateLyric from '../Lyric/useNavigateLyric';
import Volume from './Volume';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {}

const Actions: FC<Props> = () => {
  const { playingSong } = usePlayer();
  const { isDesktop } = useContext(AppContext);
  const navigateLyric = useNavigateLyric();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickLyric = () => {
    if (playingSong) {
      navigateLyric(playingSong?.id);
    }
  };

  const navigateToComments = () => {
    navigate(`/comments/${playingSong?.id}`);
  };

  const isLyricOpen = window.location.pathname.startsWith('/lyric');
  const isCommentPage = pathname.includes('/comments') && !isLyricOpen;

  return (
    <div className='flex justify-center items-center space-x-2'>
      {isDesktop && (
        <>
          <Volume />
          <ChatBubbleOvalLeftEllipsisIcon
            onClick={navigateToComments}
            className={cls(
              'h-7 w-7 hover:text-primary cursor-pointer',
              isCommentPage ? 'text-primary' : 'text-secondary'
            )}
          />
          <LyricIcon
            className={cls(
              'w-8 h-8 cursor-pointer hover:text-primary',
              isLyricOpen ? 'text-primary' : 'text-secondary'
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
