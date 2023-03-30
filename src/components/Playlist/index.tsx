import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { sumBy } from 'lodash-es';
import usePlaylist from '../../fetchers/usePlaylist';
import { msToHours, msToMinutes } from '../../utils/msConvert';
import './style.scss';
import usePlayer from '../../context/App/usePlayer';
import { ITrack } from '../../types/playlist';
import Button from '../Button';
import Image from '../Image';
import Loading from '../Loading';
import Song from '../Song';

interface Props {}

const Playlist: React.FC<Props> = () => {
  const { id } = useParams();
  const { play, pause, isPlaying, playingSong, replaceQueue, appendQueue } =
    usePlayer();

  const { data: playlist, error } = usePlaylist(id);

  const totalTime = useMemo(() => {
    const totalMs = sumBy(playlist?.tracks || [], 'dt');
    return msToHours(totalMs);
  }, [playlist]);

  const handlePlay = (track: ITrack) => {
    if (playingSong?.id === track.id && isPlaying) {
      pause();
    } else {
      play(track);
    }
  };

  const handlePlayList = () => {
    replaceQueue(playlist.tracks);
  };

  const handleAppendQueue = () => {
    appendQueue(playlist.tracks);
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!playlist) {
    return <Loading />;
  }

  return (
    <div className='playlist'>
      <div className='playlist-info'>
        <Image className='playlist-cover' src={playlist.coverImgUrl} alt='' />
        <div className='playlist-detail'>
          <h2>{playlist.name}</h2>
          <div className='playlist-stats'>
            {playlist.trackCount}首歌曲，时长{totalTime}
          </div>
          <div className='playlist-desc'>{playlist.description}</div>
          <div className='playlist-action'>
            <div className='space-x-4'>
              <Button onClick={handlePlayList} pirmary>
                播放
              </Button>
              <Button onClick={handleAppendQueue}>加入播放列表</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='divide-y mt-6'>
        {playlist.tracks.map((track) => (
          <Song song={track} key={track.id} duration />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
