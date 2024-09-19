import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateLyric = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const navigateLyric = (id: string | number) => {
    navigate(`/lyric/${id}`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  return navigateLyric;
};

export default useNavigateLyric;
