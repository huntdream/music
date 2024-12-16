import React, { ReactNode, useEffect, useMemo, useRef } from 'react';
import cls from 'classnames';
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

  const isHighlighted = hlKey.line === key;

  useEffect(() => {
    if (isHighlighted) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  const renderText = () => {
    if (typeof text === 'string') {
      return text;
    }

    return text.map((t) => (
      <Word
        word={t}
        key={t.wordKey}
        isHighlighted={isHighlighted && hlKey.word >= t.wordKey}
      />
    ));
  };

  return (
    <div
      ref={ref}
      className={cls(
        'mb-6  whitespace-pre',
        isHighlighted ? 'font-bold text-primary' : 'text-secondary'
      )}
      onClick={onClick}
    >
      <div>{renderText()}</div>
      {translation && <div className='text-secondary'>{translation}</div>}
    </div>
  );
};

export default Line;
