import React, { useEffect, useMemo, useRef, useState } from 'react';
import useLyric from '../../fetchers/useLyric';
import { parseLyric } from '../../utils/parseLyric';
import Line, { HlKey, LyricLine } from './Line';
import usePlayer from '../Player/usePlayer';

interface Props {
  id: number | string;
}

const Lyric: React.FC<Props> = ({ id }) => {
  const { audioRef } = usePlayer();
  const [hlKey, setHlKey] = useState<HlKey>({ line: 0, word: 0 });

  const audio = audioRef.current;
  const lyricRef = useRef<HTMLDivElement>(null);
  const [lyricData] = useLyric(id);

  const lyric = useMemo(() => {
    const rawText = lyricData?.yrc?.lyric || lyricData?.lrc?.lyric;
    if (!rawText) return [];

    const tranText = lyricData?.tlyric?.lyric;

    const rawLyric = parseLyric(
      rawText,
      lyricData?.yrc?.lyric ? 'word' : 'line'
    );

    if (tranText) {
      const tranLyric = parseLyric(tranText);

      const fullLyric = rawLyric.map((l, index) => ({
        ...l,
        translation: tranLyric[index]?.text as string,
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

      const key: HlKey = {
        line: line?.key || 0,
        word: 0,
      };

      if (line?.type === 'word') {
        const word = (line.text as LyricLine[]).findLast(({ timestamp }) => {
          return ct >= timestamp;
        });

        key.word = word?.wordKey || 0;
      }

      setHlKey(key);
    };

    audio?.addEventListener('timeupdate', updateLyric);

    return () => audio?.removeEventListener('timeupdate', updateLyric);
  }, [audio, lyric, hlKey]);

  const seekTime = (time: number, key: number) => {
    if (audio) {
      audio.currentTime = time;
      setHlKey({ line: key, word: 0 });
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
              hlKey={hlKey}
              key={item.key}
              lyric={item}
              type='line'
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
