import { useLocation, useNavigate } from 'react-router-dom';

const useNavigatePlaying = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigatePlaying = (id: string | number, replace?: boolean) => {
    const isPlaying = window.location.pathname.startsWith('/playing');

    if (isPlaying && !replace) {
      return navigate(-1);
    }

    navigate(`/playing/${id}`, {
      replace: isPlaying,
      state: {
        backgroundLocation: location.state?.backgroundLocation || location,
      },
    });
  };
  return navigatePlaying;
};

export default useNavigatePlaying;
