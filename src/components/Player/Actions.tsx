import { FC, use, MouseEvent } from 'react';
import { LyricIcon } from '../../icons/Audio';
import usePlayer from './usePlayer';
import { AppContext } from '../../context/App/App';
import Queue from './Queue';
import useNavigateLyric from '../Lyric/useNavigateLyric';
import Volume from './Volume';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircleMore } from 'lucide-react';
import IconButton from '../IconButton';

interface Props {}

const Actions: FC<Props> = () => {
  const { playingSong } = usePlayer();
  const { isDesktop } = use(AppContext);
  const navigateLyric = useNavigateLyric();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLyricOpen = window.location.pathname.startsWith('/lyric');
  const isCommentPage = pathname.includes('/comments') && !isLyricOpen;

  const handleClickLyric = (e: MouseEvent) => {
    e.stopPropagation();

    if (playingSong) {
      navigateLyric(playingSong?.id);
    }
  };

  const navigateToComments = (e: MouseEvent) => {
    e.stopPropagation();

    if (isCommentPage) {
      navigate(-1);
    } else {
      navigate(`/comments/${playingSong?.id}`);
    }
  };

  return (
    <div className='flex justify-center items-center space-x-1'>
      {isDesktop && (
        <>
          <Volume />
          <IconButton onClick={navigateToComments}>
            <MessageCircleMore />
          </IconButton>
          <IconButton onClick={handleClickLyric} className='p-1'>
            <LyricIcon />
          </IconButton>
        </>
      )}
      <Queue />
    </div>
  );
};

export default Actions;
