import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateLyric = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const navigateLyric = (id: string | number) => {
    if (window.location.pathname.startsWith('/lyric')) {
      navigate(-1);
    } else {
      navigate(`/lyric/${id}`, {
        state: {
          backgroundLocation: location,
        },
      });
    }
  };

  return navigateLyric;
};

export default useNavigateLyric;
