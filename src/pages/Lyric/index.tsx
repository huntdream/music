import React, { useEffect, useRef } from 'react';
import useNavigateLyric from '../../components/Lyric/useNavigateLyric';
import usePlayer from '../../components/Player/usePlayer';
import { useParams } from 'react-router-dom';
import LyricComp from '../../components/Lyric';
import useSongDetail from '../../fetchers/useSongDetail';

interface Props {}

const Lyric: React.FC<Props> = () => {
  const { id } = useParams();
  const { playingSong, queue, appendQueue, setPlayingSong } = usePlayer();
  const navigateLyric = useNavigateLyric();
  const [songDetail] = useSongDetail(id);

  const mouted = useRef(false);

  useEffect(() => {
    if (playingSong) {
      if (mouted.current) {
        navigateLyric(playingSong.id, true);
      } else {
        mouted.current = true;
      }
    }
  }, [playingSong]);

  useEffect(() => {
    if (id && songDetail && !queue.length) {
      appendQueue(songDetail);
      setPlayingSong(songDetail);
    }
  }, [id, songDetail, queue]);

  return (
    <div className='fixed z-50 inset-0 bg-white/80 backdrop-blur-md animate-slide-in'>
      <LyricComp id={id!} />
    </div>
  );
};

export default Lyric;
