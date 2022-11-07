import React, { MouseEvent, useState } from 'react';
import cls from 'classnames';
import './style.scss';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IPlaylistsItem } from '../../types/playlist';
import { PauseIcon, VolumeIcon, PlayIcon } from '../../icons/Audio';
import usePlayer from '../../context/App/usePlayer';

interface Props {
  data: IPlaylistsItem;
}

const Playlist: React.FC<Props> = ({ data }) => {
  const { replaceQueue } = usePlayer();
  const { id, name, coverImgUrl, trackCount, creator } = data;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPause, setShowPause] = useState(false);

  const navigate = useNavigate();

  const handlePlaylistClick = () => {
    navigate(`/playlist/${id}`);
  };

  const handlePlay = (e: MouseEvent) => {
    e.stopPropagation();
    replaceQueue(id);
    setIsPlaying(!isPlaying);
  };

  const handleShowPause = () => {
    if (!isPlaying) return;

    setShowPause(true);
  };

  const handleHidePause = () => {
    setShowPause(false);
  };

  return (
    <div className='playlist-card' onClick={handlePlaylistClick}>
      <div className='playlist-card-cover'>
        <img
          src={`${coverImgUrl}?param=240y240`}
          alt=''
          className='playlist-card-cover-img'
        />
        <div
          className={cls('playlist-card-play', {
            isPlaying,
          })}
          onClick={handlePlay}
          onMouseEnter={handleShowPause}
          onMouseLeave={handleHidePause}
        >
          <div className='playlist-card-play-circle'>
            {isPlaying ? (
              showPause ? (
                <PauseIcon />
              ) : (
                <VolumeIcon />
              )
            ) : (
              <PlayIcon />
            )}
          </div>
        </div>
      </div>
      <div className='playlist-card-info'>
        <div className='playlist-card-name' title={name}>
          {name}
        </div>
        <div className='playlist-card-info-footer'>
          <div className='playlist-card-trackcount'>{trackCount}首</div>
          <Avatar src={creator?.avatarUrl} size={18} />
        </div>
      </div>
    </div>
  );
};

export default Playlist;
