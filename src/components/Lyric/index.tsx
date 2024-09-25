import React, { useEffect, useMemo, useRef, useState } from 'react';
import usePlayer from '../../context/App/usePlayer';
import useLyric from '../../fetchers/useLyric';
import { parseLyric } from '../../utils/parseLyric';
import { useParams } from 'react-router-dom';
import Line from './Line';
import useSongDetail from '../../fetchers/useSongDetail';

interface Props {}

const Lyric: React.FC<Props> = () => {
  const { audioRef, play, queue, appendQueue } = usePlayer();
  const [hlKey, setHlKey] = useState<number>(0);
  const audio = audioRef.current;
  const lyricRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [songDetail] = useSongDetail(id);
  const [lyricData] = useLyric(id);

  const lyricRawText = lyricData?.lrc.lyric;

  const lyric = useMemo(() => parseLyric(lyricRawText), [lyricRawText]);

  useEffect(() => {
    if (id && songDetail && !queue.length) {
      appendQueue(songDetail);
      play(songDetail);
    }
  }, [id, songDetail, queue]);

  useEffect(() => {
    const updateLyric = () => {
      const ct = audio?.currentTime || 0;

      const line = lyric.findLast(({ timestamp }, index) => {
        return ct >= timestamp;
      });

      const key = line?.key || 0;

      setHlKey(key);
    };

    audio?.addEventListener('timeupdate', updateLyric);

    return () => audio?.removeEventListener('timeupdate', updateLyric);
  }, [audio, lyric, hlKey]);

  const seekTime = (time: number, key: number) => {
    if (audio) {
      audio.currentTime = time;
      setHlKey(key);
    }
  };

  return (
    <div className='fixed inset-0 bg-white/80 backdrop-blur-md animate-slide-in'>
      <div className='h-full overflow-auto'>
        <div
          className='text-center text-xl overflow-auto mb-[50vh]'
          ref={lyricRef}
        >
          {lyric.map(({ text, key, timestamp }) => (
            <Line
              onClick={() => seekTime(timestamp, key)}
              isHighlighted={hlKey === key}
              key={key}
            >
              {text}
            </Line>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lyric;
