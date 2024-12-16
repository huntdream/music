import React, { useEffect, useRef, useState } from 'react';
import cls from 'classnames';

interface Props {
  word: LyricWord;
  isHighlighted: boolean;
}

export type LyricWord = {
  text: string;
  key: number;
  wordKey: number;
  duration: number;
  timestamp: number;
};

const Word: React.FC<Props> = ({ word, isHighlighted }) => {
  const { text, duration, timestamp } = word;
  const raf = useRef<number>(0);

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (isHighlighted) {
      const startTime = Date.now();
      const durationMs = duration * 1000;

      function calcProgress() {
        const percent = (Date.now() - startTime) / durationMs;

        setProgress(percent * 100);
        raf.current = requestAnimationFrame(calcProgress);

        if (percent >= 1) {
          cancelAnimationFrame(raf.current);
        }
      }

      requestAnimationFrame(calcProgress);
    }

    return () => cancelAnimationFrame(raf.current);
  }, [isHighlighted, duration]);

  return (
    <span
      className={cls(
        'origin-right bg-clip-text text-transparent transition-transform inline-block ease-in-out'
      )}
      style={{
        transitionDuration: `${duration}s`,
        transform: isHighlighted ? 'matrix(1, 0, 0, 1, 0, -2)' : undefined,
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.85) ${progress}%, rgba(0, 0, 0, 0.5) ${
          progress ? progress + 20 : 0
        }%)`,
      }}
    >
      {text}
    </span>
  );
};

export default Word;
