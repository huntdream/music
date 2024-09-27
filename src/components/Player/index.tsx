import React, {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cls from 'classnames';
import useSongUrl from '../../fetchers/useSongUrl';
import './style.scss';
import { PlaylistIcon } from '../../icons/Audio';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import Image from '../Image';
import Queue from './Queue';
import { AppContext } from '../../context/App/App';
import useNavigateLyric from '../Lyric/useNavigateLyric';
import fetcher from '../../utils/fetcher';
import { uniqBy } from 'lodash-es';
import { ITrack, IPlaylist } from '../../types/playlist';
import { ISong } from '../../types/song';
import { PlayerContext } from './Provider';

interface Props {}

const Player: React.FC<Props> = () => {
  const {
    queue,
    setIsPlaying,
    isPlaying,
    playingSong,
    audioRef,
    next,
    prev,
    pause,
    play,
  } = useContext(PlayerContext);
  const [url] = useSongUrl(playingSong?.id);
  const { isDesktop } = useContext(AppContext);
  const navigateLyric = useNavigateLyric();
  const navigate = useNavigate();

  const audio = audioRef.current;

  useEffect(() => {
    if (url) {
      audioRef.current?.play();
    }
  }, [audioRef, url]);

  const handleEnded = () => {
    next();
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (window.location.pathname.startsWith('/lyric')) {
      navigate(-1);
    } else {
      navigateLyric(playingSong!.id);
    }
  };

  const handlePause = (e: MouseEvent) => {
    e.stopPropagation();
    pause();
  };

  const handlePlay = (e: MouseEvent) => {
    e.stopPropagation();
    play();
  };

  useEffect(() => {
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      prev();
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      next();
    });
  }, [queue, playingSong]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      if (playingSong) {
        console.log('media');
        const metadata = new MediaMetadata({
          title: playingSong?.name,
          artist: playingSong?.ar.map((it) => it.name).join('/'),
          album: playingSong?.al.name,
          artwork: [
            {
              src: playingSong?.al.picUrl || '',
            },
          ],
        });
        navigator.mediaSession.metadata = metadata;
      }
    }
  }, [playingSong]);

  useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio?.addEventListener('play', handlePlay);
    audio?.addEventListener('pause', handlePause);

    return () => {
      audio?.removeEventListener('play', handlePlay);
      audio?.removeEventListener('pause', handlePause);
    };
  }, [audio, setIsPlaying]);

  return (
    <div
      className={cls('player', {
        visible: !!playingSong,
        mobile: !isDesktop,
      })}
    >
      <audio src={url} ref={audioRef} onEnded={handleEnded}></audio>
      <div className='player-inner' onClick={handleClick}>
        <div className='player-song'>
          <div className='player-song-cover'>
            <Image
              className='player-song-cover-img'
              src={`${playingSong?.al?.picUrl}?param=50y50`}
              alt=''
            />
          </div>
          <div className='player-song-info'>
            <div className='player-song-name'>
              <span className='ellipsis' title={playingSong?.name}>
                {playingSong?.name}
              </span>
            </div>
            <div className='player-song-aral text-secondary'>
              <div className='player-song-artists ellipsis'>
                {playingSong?.ar?.map((ar) => (
                  <Link
                    to={`/artist/${ar.id}`}
                    className='player-song-artist text-secondary'
                    key={ar.id}
                    title={ar.name}
                  >
                    {ar.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='player-controls'>
          <div className='player-controls-icon'>
            <Queue>
              <PlaylistIcon className='w-8 h-8' />
            </Queue>
          </div>

          <div className='player-controls-icon'>
            {isPlaying ? (
              <PauseIcon onClick={handlePause} />
            ) : (
              <PlayIcon onClick={handlePlay} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
