import React, { ReactNode, useEffect, useMemo, useRef } from 'react';
import cls from 'classnames';

export interface LyricLine {
  type: 'line' | 'word';
  text: string | LyricLine[];
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
  type: 'line' | 'word';
  onClick?: () => void;
}

const Line: React.FC<Props> = ({ hlKey, lyric, type, onClick }) => {
  const { text, wordKey = 0, key, translation, duration } = lyric;
  const ref = useRef<HTMLDivElement>(null);

  const isHighlighted = useMemo(() => {
    if (hlKey.line === key) {
      if (type === 'line') {
        return true;
      }

      if (hlKey.word >= wordKey) {
        return true;
      }
    }
  }, [hlKey, key, wordKey]);

  useEffect(() => {
    if (isHighlighted && type === 'line') {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  const renderText = () => {
    if (typeof text === 'string') {
      return text;
    }

    return text.map((t, index) => (
      <Line hlKey={hlKey} lyric={t} key={t.wordKey} type='word' />
    ));
  };

  return (
    <div
      ref={ref}
      className={cls(
        'mb-6 transition-colors ease-in-out whitespace-pre',
        isHighlighted ? 'font-bold text-primary' : 'text-secondary',
        type === 'word' ? 'inline-flex ' : ''
      )}
      onClick={onClick}
    >
      <div>{renderText()}</div>
      {translation && <div className='text-secondary'>{translation}</div>}
    </div>
  );
};

export default Line;
