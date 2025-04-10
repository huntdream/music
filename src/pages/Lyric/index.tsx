import React, { useEffect, useRef } from 'react';
import useNavigateLyric from '../../components/Lyric/useNavigateLyric';
import usePlayer from '../../components/Player/usePlayer';
import { useParams } from 'react-router-dom';
import LyricComp from '../../components/Lyric';
import { useSongDetail } from '../../fetchers/song';
import { Button } from '@/components/ui/button';
import { ArrowDownFromLine } from 'lucide-react';

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
    <div className='fixed z-40 inset-0 bg-background/80 backdrop-blur-md animate-slide-in'>
      <Button
        size='icon'
        variant='ghost'
        className='fixed left-2 top-2'
        onClick={() => navigateLyric(id!)}
      >
        <ArrowDownFromLine />
      </Button>
      <LyricComp id={id!} />
    </div>
  );
};

export default Lyric;
