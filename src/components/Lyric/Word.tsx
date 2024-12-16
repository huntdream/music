import React, { useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';

interface Props {
  word: LyricWord;
  isHighlighting: boolean;
  isHighlighted: boolean;
}

export type LyricWord = {
  text: string;
  key: number;
  wordKey: number;
  duration: number;
  timestamp: number;
};

const Word: React.FC<Props> = ({ word, isHighlighting, isHighlighted }) => {
  const { text, duration } = word;
  const raf = useRef<number>(0);

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const resetRaf = () => cancelAnimationFrame(raf.current);

    if (isHighlighting) {
      const startTime = Date.now();
      const durationMs = duration * 1000;

      function calcProgress() {
        const percent = (Date.now() - startTime) / durationMs;

        setProgress(Math.min(percent * 100, 100));

        if (percent < 1) {
          raf.current = requestAnimationFrame(calcProgress);
        } else {
          resetRaf();
        }
      }

      raf.current = requestAnimationFrame(calcProgress);
    } else {
      console.log('this is ');
      resetRaf();
      setProgress(0);
    }

    return () => resetRaf();
  }, [isHighlighting, duration]);

  const transitionDuration = useMemo(() => `${Math.max(duration, 1)}s`, []);

  return (
    <span
      className={cls(
        'origin-right bg-clip-text text-transparent transition-transform inline-block ease will-change-transform'
      )}
      style={{
        transitionDuration,
        transform:
          isHighlighting || isHighlighted
            ? 'matrix(1, 0, 0, 1, 0, -2)'
            : undefined,
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
