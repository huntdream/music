import React, { ReactNode, useEffect, useRef } from 'react';
import cls from 'classnames';
import './style.scss';

interface Props {
  isHighlighted: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const Line: React.FC<Props> = ({ isHighlighted, children, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isHighlighted) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  return (
    <div
      ref={ref}
      className={cls('lyric-sentence', {
        'lyric-sentence--hl': isHighlighted,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Line;
