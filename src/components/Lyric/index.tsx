import React, { useEffect, useMemo, useRef, useState } from 'react';
import useLyric from '../../fetchers/useLyric';
import { parseLyric } from '../../utils/parseLyric';
import Line, { HlKey, LyricLine } from './Line';
import usePlayer from '../Player/usePlayer';
import { Button } from '../ui/button';
import { PictureInPicture } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  id: number | string;
}

const Lyric: React.FC<Props> = ({ id }) => {
  const { audioRef } = usePlayer();
  const [hlKey, setHlKey] = useState<HlKey>({ line: 0, word: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const audio = audioRef.current;
  const lyricRef = useRef<HTMLDivElement>(null);
  const [lyricData] = useLyric(id);

  useEffect(() => {
    lyricRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [lyricData]);

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

      if (hlKey.line !== key.line || hlKey.word !== key.word) {
        setHlKey(key);
      }
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

  const pip = async () => {
    if (!('documentPictureInPicture' in window)) {
      toast.error('当前浏览器不支持文档画中画');
      return;
    }
    // @ts-ignore
    const pipWindow = await documentPictureInPicture.requestWindow({
      disallowReturnToOpener: true,
    });

    [...document.styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules]
          .map((rule) => rule.cssText)
          .join('');
        const style = document.createElement('style');

        style.textContent = cssRules;
        pipWindow.document.head.appendChild(style);
      } catch (e) {
        const link = document.createElement('link');

        link.rel = 'stylesheet';
        link.type = styleSheet.type;
        link.media = styleSheet.media.mediaText;
        if (styleSheet.href) {
          link.href = styleSheet.href;
        }
        pipWindow.document.head.appendChild(link);
      }
    });

    pipWindow.document.body.append(lyricRef.current);

    pipWindow.addEventListener('pagehide', () => {
      const playerContainer = ref.current;
      const pipPlayer = lyricRef.current;
      if (!playerContainer || !pipPlayer) return;

      playerContainer.append(pipPlayer);
    });
  };

  return (
    <div className='h-full overflow-auto p-2 px-6' ref={ref}>
      <div className='absolute top-2 right-2'>
        <Button size='icon' variant='ghost' onClick={pip}>
          <PictureInPicture />{' '}
        </Button>
      </div>
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
            />
          ))
        ) : (
          <div className='text-secondary-foreground'>暂无歌词</div>
        )}
      </div>
    </div>
  );
};

export default Lyric;
