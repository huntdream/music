import React, { useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';

interface Props {
  word: LyricWord;
  isHighlighting: boolean;
}

export type LyricWord = {
  text: string;
  key: number;
  wordKey: number;
  duration: number;
  timestamp: number;
};

const Word: React.FC<Props> = ({ word, isHighlighting }) => {
  const { text, duration } = word;
  const [isPassed, setIsPassed] = useState(false);
  const raf = useRef<number>(0);

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (isHighlighting) {
      const startTime = Date.now();
      const durationMs = duration * 1000;

      function calcProgress() {
        const percent = (Date.now() - startTime) / durationMs;

        setProgress(percent * 100);
        raf.current = requestAnimationFrame(calcProgress);

        if (percent >= 1) {
          cancelAnimationFrame(raf.current);
          setIsPassed(true);
        }
      }

      requestAnimationFrame(calcProgress);
    } else {
      setProgress(0);
      setIsPassed(false);
      cancelAnimationFrame(raf.current);
    }

    return () => cancelAnimationFrame(raf.current);
  }, [isHighlighting, duration]);

  const transitionDuration = useMemo(() => `${Math.max(duration, 1)}s`, []);

  return (
    <span
      className={cls(
        'origin-right bg-clip-text text-transparent transition-transform inline-block ease-in-out'
      )}
      style={{
        transitionDuration,
        transform:
          isHighlighting || isPassed ? 'matrix(1, 0, 0, 1, 0, -2)' : undefined,
        backgroundImage: `linear-gradient(90deg, var(--color-primary) ${progress}%, var(--color-secondary) ${
          progress ? progress + 20 : 0
        }%)`,
      }}
    >
      {text}
    </span>
  );
};

export default Word;
