import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { sumBy } from 'lodash-es';
import usePlaylist from '../../fetchers/usePlaylist';
import { msToHours } from '../../utils/msConvert';
import { ITrack } from '../../types/playlist';
import Button from '../Button';
import Image from '../Image';
import Loading from '../Loading';
import Song from '../Song';
import usePlayer from '../Player/usePlayer';

interface Props {}

const Playlist: React.FC<Props> = () => {
  const { id } = useParams();
  const { pause, isPlaying, playingSong, replaceQueue, appendQueue } =
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
      appendQueue(playlist.tracks);
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
    <div className='my-4 mx-2'>
      <div className='flex flex-wrap pb-4 border-b'>
        <Image
          className='w-60 h-60 rounded-md mr-6'
          src={playlist.coverImgUrl}
          alt=''
        />
        <div className='flex flex-col'>
          <h2 className='text-lg mb-2'>{playlist.name}</h2>
          <div className='text-sm text-secondary mb-2'>
            {playlist.trackCount}首歌曲<span className='mx-1'>•</span>时长
            {totalTime}
          </div>
          <div className='mt-auto text-secondary mb-8'>
            {playlist.description}
          </div>
          <div className='self-end'>
            <div className='space-x-4'>
              <Button onClick={handlePlayList} pirmary>
                播放
              </Button>
              <Button onClick={handleAppendQueue}>加入播放列表</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        {playlist.tracks.map((track) => (
          <Song song={track} key={track.id} onPlay={handlePlay} duration />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
