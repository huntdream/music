import { useEffect, useRef } from 'react';

const useClickAway = <T extends HTMLElement>(onClickAway: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickAway();
      }
    };

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, [ref]);

  return ref;
};

export default useClickAway;
