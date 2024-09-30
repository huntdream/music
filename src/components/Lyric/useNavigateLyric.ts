import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateLyric = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateLyric = (id: string | number, replace?: boolean) => {
    const isLyric = window.location.pathname.startsWith('/lyric');
    const isLyricFirstLoad = !location.state;

    if (isLyric && !replace) {
      return isLyricFirstLoad ? navigate('/') : navigate(-1);
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
