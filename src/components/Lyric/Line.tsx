import React, { ReactNode, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import Word, { LyricWord } from './Word';

export interface LyricLine {
  type: 'line' | 'word';
  text: string | LyricWord[];
  wordKey?: number;
  key: number;
  timestamp: number;
  duration?: number;
  translation?: string;
}

export type HlKey = {
  line: number;
  word: number;
};

interface Props {
  hlKey: HlKey;
  lyric: LyricLine;
  onClick?: () => void;
}

const Line: React.FC<Props> = ({ hlKey, lyric, onClick }) => {
  const { text, wordKey = 0, key, translation, duration } = lyric;
  const ref = useRef<HTMLDivElement>(null);

  const isHighlighting = hlKey.line === key;
  const isHighlighted = hlKey.line > key;
  const isLine = typeof text === 'string';

  useEffect(() => {
    if (isHighlighting) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighting]);

  const renderText = () => {
    if (isLine) {
      return text;
    }

    return text.map((t) => (
      <Word
        word={t}
        key={t.wordKey}
        isHighlighting={isHighlighting && hlKey.word >= t.wordKey}
        isHighlighted={isHighlighted}
      />
    ));
  };

  return (
    <div
      ref={ref}
      className={clsx(
        'mb-6 text-xl',
        isHighlighting ? 'text-primary' : 'text-secondary-foreground'
      )}
      onClick={onClick}
    >
      <div className={isHighlighting ? 'font-bold' : ''}>{renderText()}</div>
      {translation && (
        <div className='text-muted-foreground'>{translation}</div>
      )}
    </div>
  );
};

export default Line;
