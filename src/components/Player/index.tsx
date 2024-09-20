import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cls from 'classnames';
import usePlayer from '../../context/App/usePlayer';
import useSongUrl from '../../fetchers/useSongUrl';
import './style.scss';
import { PlaylistIcon } from '../../icons/Audio';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import Image from '../Image';
import Queue from './Queue';
import { AppContext } from '../../context/App/App';
import useNavigateLyric from '../Lyric/useNavigateLyric';

interface Props {}

const Player: React.FC<Props> = () => {
  const { playingSong, next, prev, play, pause, audioRef, isPlaying } =
    usePlayer();
  const [url] = useSongUrl(playingSong?.id);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const { isDesktop } = useContext(AppContext);
  const navigateLyric = useNavigateLyric();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      audioRef.current?.play();
    }
  }, [audioRef, url]);

  const handleEnded = () => {
    next();
  };

  const handleClick = () => {
    console.log(location);
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

  return (
    <div
      className={cls('player', {
        'player-visible': !!playingSong,
        'is-desktop': isDesktop,
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
            <div className='player-song-aral'>
              <div className='player-song-artists ellipsis'>
                {playingSong?.ar?.map((ar) => (
                  <Link
                    to={`/artist/${ar.id}`}
                    className='player-song-artist'
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
