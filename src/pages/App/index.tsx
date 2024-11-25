import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../Home';
import Config from '../Config';
import Library from '../Library';
import Playlist from '../../components/Playlist';
import Lyric from '../Lyric';
import Moment from '../Moments';
import { Toaster } from 'sonner';
import PlayerProvider from '../../components/Player/Provider';
import Main from '../Main';
import Search from '../Search';
import { useEffect } from 'react';
import Artist from '../Artist';
import Daily from '../Daily';
// import Playing from '../Playing';
import Comments from '../Comments';

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    const setupThemeColor = (query: MediaQueryList | MediaQueryListEvent) => {
      const MetaThemeColor = {
        light: '#fff',
        dark: '#18191a',
      };

      const meta = document.querySelector('meta[name="theme-color"]');

      meta?.setAttribute(
        'content',
        MetaThemeColor[query.matches ? 'dark' : 'light']
      );
    };

    const query = window.matchMedia('(prefers-color-scheme: dark)');

    setupThemeColor(query);

    query.addEventListener('change', setupThemeColor);
  }, []);

  return (
    <Config>
      <PlayerProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path='' element={<Home />}>
            <Route index path='/' element={<Main />} />
            <Route path='me' element={<Library />} />
            <Route path='playlist/:id' element={<Playlist />} />
            <Route path='moments' element={<Moment />} />
            <Route path='search' element={<Search />} />
            <Route path='lyric/:id' element={<Lyric />} />
            <Route path='artist/:id' element={<Artist />} />
            <Route path='daily' element={<Daily />} />
            <Route path='comments/:id' element={<Comments />} />
            {/* <Route path='playing/:id' element={<Playing />} /> */}
            <Route
              path='*'
              element={
                <div className='h-full w-full flex justify-center items-center'>
                  Work in progress
                </div>
              }
            />
          </Route>
        </Routes>

        <Toaster position='top-center' />
        {state?.backgroundLocation && (
          <Routes>
            <Route path='lyric/:id' element={<Lyric />} />
          </Routes>
        )}
      </PlayerProvider>
    </Config>
  );
}

export default App;
