import React, { ReactNode, useEffect, useRef } from 'react';
import cls from 'classnames';

export interface LyricLine {
  text: string;
  key: number;
  timestamp: number;
  translation?: string;
}

interface Props {
  isHighlighted: boolean;
  onClick?: () => void;
  lyric: LyricLine;
}

const Line: React.FC<Props> = ({ isHighlighted, lyric, onClick }) => {
  const { text, translation } = lyric;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isHighlighted) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  return (
    <div
      ref={ref}
      className={cls(
        'mb-8 transition-transform duration-500 ease-in-out will-change-transform',
        isHighlighted
          ? 'font-bold text-primary scale-110'
          : 'text-secondary scale-100 '
      )}
      onClick={onClick}
    >
      <div>{text}</div>
      <div>{translation}</div>
    </div>
  );
};

export default Line;
