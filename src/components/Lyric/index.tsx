import React, { useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import usePlayer from '../../context/App/usePlayer';
import useLyric from '../../fetchers/useLyric';
import { parseLyric } from '../../utils/parseLyric';
import './style.scss';
import { useNavigate } from 'react-router-dom';

interface Props {}

const Lyric: React.FC<Props> = () => {
  const { playingSong, audioRef } = usePlayer();
  const navigate = useNavigate();
  const [hlKey, setHlKey] = useState<number>(0);
  const audio = audioRef.current;

  const [lyricData] = useLyric(playingSong?.id);

  const lyricRawText = lyricData?.lrc.lyric;

  const lyric = useMemo(() => parseLyric(lyricRawText), [lyricRawText]);

  useEffect(() => {
    if (playingSong?.id) {
      navigate(`/lyric/${playingSong?.id}`, { replace: true });
    }
  }, [navigate, playingSong?.id]);

  useEffect(() => {
    const updateLyric = () => {
      const ct = audio?.currentTime || 0;

      const key =
        lyric.find(
          ({ timestamp }, index) =>
            ct >= timestamp && ct < lyric[index + 1]?.timestamp
        )?.key || 0;

      setHlKey(key);
    };

    audio?.addEventListener('timeupdate', updateLyric);

    return () => audio?.removeEventListener('timeupdate', updateLyric);
  }, [audio, lyric]);

  const seekTime = (time: number, key: number) => {
    if (audio) {
      audio.currentTime = time;
      setHlKey(key);
    }
  };

  return (
    <div className='lyric'>
      <h2 className='lyric-name'>{playingSong?.name}</h2>
      <div className='lyric-content'>
        {lyric.map(({ text, key, timestamp }) => (
          <div
            className={cls('lyric-sentence', {
              'lyric-sentence--hl': hlKey === key,
            })}
            key={key}
            onClick={() => seekTime(timestamp, key)}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lyric;
