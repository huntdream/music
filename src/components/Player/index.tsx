import React, { MouseEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cls from 'classnames';
import usePlayer from '../../context/App/usePlayer';
import useSongUrl from '../../fetchers/useSongUrl';
import './style.scss';
import {
  NextIcon,
  PrevIcon,
  PlayIcon,
  PauseIcon,
  PlaylistIcon,
} from '../../icons/Audio';
import { msToMinutes } from '../../utils/msConvert';

interface Props {}

const Player: React.FC<Props> = () => {
  const { playingSong, queue, next, prev, play, pause, audioRef, isPlaying } =
    usePlayer();
  const [url] = useSongUrl(playingSong?.id);
  const [showPlaylist, setShowPlaylist] = useState(false);

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
    navigate(`/lyric/${playingSong?.id}`);
  };

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    prev();
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    next();
  };

  const handlePause = (e: MouseEvent) => {
    e.stopPropagation();
    pause();
  };

  const handlePlay = (e: MouseEvent) => {
    e.stopPropagation();
    play();
  };

  const handlePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  return (
    <div
      className={cls('player', {
        'player-visible': !!playingSong,
      })}
    >
      <audio src={url} ref={audioRef} onEnded={handleEnded}></audio>
      <div className='player-inner' onClick={handleClick}>
        <div className='player-left-controls'>
          <PrevIcon onClick={handlePrev} className='player-normalicon' />
          {isPlaying ? (
            <PauseIcon onClick={handlePause} className='player-largeicon' />
          ) : (
            <PlayIcon onClick={handlePlay} className='player-largeicon' />
          )}
          <NextIcon onClick={handleNext} className='player-normalicon' />
        </div>
        <div className='player-song'>
          <div className='player-song-cover'>
            <img
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
              <div
                className='player-song-album ellipsis'
                title={playingSong?.al?.name}
              >
                {playingSong?.al?.name}
              </div>
            </div>
          </div>
        </div>
        <div className='player-right-controls'>
          <PlaylistIcon
            className='player-normalicon'
            onClick={handlePlaylist}
          />
        </div>
      </div>
      {showPlaylist && (
        <div className='player-playlist'>
          {queue.map((track) => (
            <div
              key={track.id}
              className='player-playlist-track'
              onClick={() => play(track)}
            >
              <div className='player-playlist-track-cover'>
                <img
                  className='player-playlist-track-cover-img'
                  src={`${track?.al?.picUrl}?param=50y50`}
                  alt=''
                />
              </div>
              <div className='player-playlist-track-info'>
                <div className='player-playlist-track-name'>
                  <span className='ellipsis' title={track.name}>
                    {track.name}
                  </span>
                </div>
                <div className='player-playlist-track-aral'>
                  <div className='player-playlist-track-artists ellipsis'>
                    {track?.ar?.map((ar) => (
                      <Link
                        to={`/artist/${ar.id}`}
                        className='player-playlist-track-artist'
                        key={ar.id}
                        title={ar.name}
                      >
                        {ar.name}
                      </Link>
                    ))}
                  </div>
                  <div
                    className='player-playlist-track-album ellipsis'
                    title={track.al.name}
                  >
                    {track.al.name}
                  </div>
                </div>
              </div>
              <div className='player-playlist-track-duration'>
                {msToMinutes(track.dt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Player;
