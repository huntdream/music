import React, { useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import usePlayer from '../../context/App/usePlayer';
import useLyric from '../../fetchers/useLyric';
import { parseLyric } from '../../utils/parseLyric';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Line from './Line';
import useSongDetail from '../../fetchers/useSongDetail';

interface Props {}

const Lyric: React.FC<Props> = () => {
  const { playingSong, audioRef, play } = usePlayer();
  const navigate = useNavigate();
  const [hlKey, setHlKey] = useState<number>(0);
  const audio = audioRef.current;
  const lyricRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const [songDetail] = useSongDetail(id);

  const [lyricData] = useLyric(playingSong?.id || id);

  const lyricRawText = lyricData?.lrc.lyric;

  const lyric = useMemo(() => parseLyric(lyricRawText), [lyricRawText]);

  useEffect(() => {
    if (!playingSong?.id && id && songDetail) {
      play(songDetail);
    }
  }, [id, songDetail]);

  useEffect(() => {
    if (playingSong?.id) {
      navigate(`/lyric/${playingSong?.id}`, { replace: true });
    }
  }, [navigate, playingSong?.id]);

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
    <div className='lyric'>
      <div className='lyric-content' ref={lyricRef}>
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
  );
};

export default Lyric;
