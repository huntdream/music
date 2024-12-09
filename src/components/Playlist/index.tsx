import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { sumBy } from 'lodash-es';
import usePlaylist from '../../fetchers/usePlaylist';
import { msToHours } from '../../utils/msConvert';
import { ITrack } from '../../types/playlist';
import Button from '../Button';
import Image from '../Image';
import Loading from '../Loading';
import usePlayer from '../Player/usePlayer';
import Input from '../Input';
import List from './List';

interface Props {}

const Playlist: React.FC<Props> = () => {
  const { id } = useParams();
  const { pause, isPlaying, playingSong, replaceQueue, appendQueue } =
    usePlayer();
  const [keyword, setKeyword] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const { data: playlist, error } = usePlaylist(id);

  const tracks = useMemo(
    () =>
      playlist?.tracks?.filter((t) =>
        t.name.toLowerCase().includes(keyword.toLowerCase())
      ),
    [keyword, playlist]
  );

  const totalTime = useMemo(() => {
    const totalMs = sumBy(playlist?.tracks || [], 'dt');
    return msToHours(totalMs);
  }, [playlist]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [id]);

  const handlePlay = useCallback(
    (track: ITrack) => {
      if (playingSong?.id === track.id && isPlaying) {
        pause();
      } else {
        appendQueue(playlist.tracks);
      }
    },
    [playlist, playingSong, isPlaying]
  );

  const handlePlayList = () => {
    replaceQueue(playlist.tracks);
  };

  const handleAppendQueue = () => {
    appendQueue(playlist.tracks);
  };

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!playlist) {
    return <Loading />;
  }

  return (
    <div className='py-4 px-2 pb-36' ref={ref}>
      <div className='flex flex-wrap pb-4 border-b px-2'>
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
      <div>
        <Input
          placeholder='搜索'
          value={keyword}
          onChange={handleKeywordChange}
        />
      </div>
      <div className='mt-4'>
        <List list={tracks} onPlay={handlePlay} />
      </div>
    </div>
  );
};

export default Playlist;
