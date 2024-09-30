import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateLyric = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateLyric = (id: string | number, replace?: boolean) => {
    const isLyric = window.location.pathname.startsWith('/lyric');

    if (isLyric && !replace) {
      navigate(-1);
      return;
    }

    navigate(`/lyric/${id}`, {
      replace: isLyric,
      state: {
        backgroundLocation: location.state?.backgroundLocation || location,
      },
    });
  };
  return navigateLyric;
};

export default useNavigateLyric;
