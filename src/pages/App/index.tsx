import { Route, Routes, useLocation } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Home from '../Home';
import Config from '../Config';
import Library from '../Library';
import Playlist from '../../components/Playlist';
import Lyric from '../../components/Lyric';
import Moment from '../Moments';
import { Toaster } from 'sonner';
import PlayerProvider from '../../components/Player/Provider';
import Main from '../Main';
import Search from '../Search';
import { useEffect } from 'react';

function App() {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    const setupThemeColor = (theme: 'dark' | 'light') => {
      const MetaThemeColor = {
        light: '#fff',
        dark: '#18191a',
      };

      const meta = document.querySelector('meta[name="theme-color"]');

      meta?.setAttribute('content', MetaThemeColor[theme]);
    };

    const query = window.matchMedia('(prefers-color-scheme: dark)');

    setupThemeColor(query.matches ? 'light' : 'dark');

    query.addEventListener('change', (e) => {
      const colorScheme = e.matches ? 'dark' : 'light';

      setupThemeColor(colorScheme);
    });
  }, []);

  return (
    <Config>
      <Theme>
        <PlayerProvider>
          <Routes location={state?.backgroundLocation || location}>
            <Route path='' element={<Home />}>
              <Route index path='/' element={<Main />} />
              <Route path='me' element={<Library />} />
              <Route path='playlist/:id' element={<Playlist />} />
              <Route path='moments' element={<Moment />} />
              <Route path='search' element={<Search />} />
              <Route path='lyric/:id' element={<Lyric />} />
            </Route>
          </Routes>

          <Toaster position='top-center' />
          {state?.backgroundLocation && (
            <Routes>
              <Route path='lyric/:id' element={<Lyric />} />
            </Routes>
          )}
        </PlayerProvider>
      </Theme>
    </Config>
  );
}

export default App;
