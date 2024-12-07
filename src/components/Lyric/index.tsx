import React, { useEffect, useMemo, useRef, useState } from 'react';
import useLyric from '../../fetchers/useLyric';
import { parseLyric } from '../../utils/parseLyric';
import Line from './Line';
import usePlayer from '../Player/usePlayer';

interface Props {
  id: number | string;
}

const Lyric: React.FC<Props> = ({ id }) => {
  const { audioRef } = usePlayer();
  const [hlKey, setHlKey] = useState<number>(0);

  const audio = audioRef.current;
  const lyricRef = useRef<HTMLDivElement>(null);
  const [lyricData] = useLyric(id);

  const lyric = useMemo(() => {
    const rawText = lyricData?.lrc?.lyric;
    if (!rawText) return [];

    const tranText = lyricData?.tlyric?.lyric;

    const rawLyric = parseLyric(rawText);

    if (tranText) {
      const tranLyric = parseLyric(tranText);

      const fullLyric = rawLyric.map((l, index) => ({
        ...l,
        translation: tranLyric[index]?.text,
      }));

      return fullLyric;
    }

    return rawLyric;
  }, [lyricData]);

  useEffect(() => {
    const updateLyric = () => {
      const ct = audio?.currentTime || 0;

      const line = lyric.findLast(({ timestamp }) => {
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
    <div className='h-full overflow-auto p-2 px-6'>
      <div
        className='text-center text-xl pt-[43vh] px-6 mb-[50vh] flex items-center flex-col'
        ref={lyricRef}
      >
        {lyric.length ? (
          lyric.map((item) => (
            <Line
              onClick={() => seekTime(item.timestamp, item.key)}
              isHighlighted={hlKey === item.key}
              key={item.key}
              lyric={item}
            />
          ))
        ) : (
          <div className='text-secondary'>暂无歌词</div>
        )}
      </div>
    </div>
  );
};

export default Lyric;
