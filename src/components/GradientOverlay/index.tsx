import clsx from 'clsx';
import React from 'react';

interface Props {
  className?: string;
  position?: 'top' | 'bottom';
}

const GradientOverlay: React.FC<Props> = ({
  className,
  position = 'bottom',
}) => {
  return (
    <div
      className={clsx(
        'z-10 flex justify-center  from-white to-white/40 dark:from-gray-950 dark:to-gray-950/40 absolute w-full py-8',
        position === 'top' ? 'top-0 bg-linear-to-b' : 'bottom-0 bg-linear-to-t',
        className
      )}
    ></div>
  );
};

export default GradientOverlay;
