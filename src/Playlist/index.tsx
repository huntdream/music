import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { sumBy } from 'lodash-es';
import usePlaylist from '../fetchers/usePlaylist';
import { msToHours, msToMinutes } from '../utils/msConvert';
import './style.scss';
import usePlayer from '../context/App/usePlayer';
import { ITrack } from '../types/playlist';
import Button from '../components/Button';

interface Props {}

const Playlist: React.FC<Props> = () => {
  const { id } = useParams();
  const { play, pause, isPlaying, playingSong, replaceQueue, appendQueue } =
    usePlayer();

  const [playlist] = usePlaylist(id);

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

  if (!playlist) {
    return <div>loading...</div>;
  }

  return (
    <div className='playlist'>
      <div className='playlist-info'>
        <img className='playlist-cover' src={playlist.coverImgUrl} alt='' />
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
      <div className='playlist-tracks'>
        {playlist.tracks.map((track) => (
          <div
            key={track.id}
            className='playlist-track'
            onClick={() => handlePlay(track)}
          >
            <div className='playlist-track-cover'>
              <img
                className='playlist-track-cover-img'
                src={`${track.al.picUrl}?param=50y50`}
                alt=''
              />
            </div>
            <div className='playlist-track-info'>
              <div className='playlist-track-name'>
                <span className='ellipsis' title={track.name}>
                  {track.name}
                </span>
              </div>
              <div className='playlist-track-aral'>
                <div className='playlist-track-artists ellipsis'>
                  {track.ar.map((ar) => (
                    <Link
                      to={`/artist/${ar.id}`}
                      className='playlist-track-artist'
                      key={ar.id}
                      title={ar.name}
                    >
                      {ar.name}
                    </Link>
                  ))}
                </div>
                <div
                  className='playlist-track-album ellipsis'
                  title={track.al.name}
                >
                  {track.al.name}
                </div>
              </div>
            </div>
            <div className='playlist-track-duration'>
              {msToMinutes(track.dt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
