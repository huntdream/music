import React, { ReactNode, useEffect, useRef } from 'react';
import cls from 'classnames';

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
      className={cls('my-4 text-slate-600', {
        'font-bold text-slate-800': isHighlighted,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Line;
